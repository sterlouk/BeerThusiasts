# Security Review

This is a self-review of BeerThusiasts. I wrote the app as a full-stack/database project and audited it afterwards. The goal is to be honest about what was wrong, what I fixed, and what is still open.

**Scope:** Express API (`backend/src`), upload handling, configuration and secrets, dependencies, and the React client's access control.
**Method:** I reviewed the code by hand, ran `npm audit`, and reproduced each fixed issue against the original code before and after the fix.

> The app is a local demo. It is not hardened for deployment. See [Open issues](#open-issues) before exposing it to a network.

## Summary

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| F1 | Path traversal leading to arbitrary file write in the image upload | High | Fixed |
| F2 | Unrestricted upload file type (stored XSS via `.html`) | Medium | Fixed |
| F3 | No upload size limit | Low | Fixed |
| F4 | Database credentials committed to the repository | Medium | Fixed |
| F5 | `node_modules` committed; 9 known-vulnerable dependencies (1 critical) | Medium | Fixed |
| F6 | CORS allowed any origin | Low | Fixed |
| O1 | No authentication or server-side authorization | Critical | Open |
| O2 | Client-supplied identity (`customer_id`), allowing IDOR | High | Open |
| O3 | Client-controlled `supply_price` on supplier orders | Medium | Open |
| O4 | Order status update trusts a client-supplied `pub_id` for inventory | Medium | Open |
| O5 | No rate limiting or security headers | Low | Open |

---

## Fixed issues

### F1: Path traversal in the image upload (High)

`POST /api/admin/beers/:id/image` built the stored filename as `` `${req.params.id}${path.extname(file.originalname)}` ``. Express URL-decodes route params, so `%2F` turns into `/`, and multer joins the filename onto the upload directory. An attacker could therefore write a file anywhere the Node process could write:

```
POST /api/admin/beers/..%2F..%2F..%2Fpwn_poc/image      (file: x.js)
→ 200 {"filename":"../../../pwn_poc.js"}                 # written to backend/pwn_poc.js
```

Pointing the same request at `src/app.js` or a route file overwrites server code, which runs on the next restart. That turns the bug into remote code execution, made worse by O1 (no auth).

**Fix** ([`backend/src/routes/admin.js`](backend/src/routes/admin.js)):
- `:id` must match `^[1-9]\d*$`, otherwise the request is rejected with 400.
- The server always sets the stored name to `<id>.jpg`. The client's filename and extension are never used.

### F2: Unrestricted upload type (Medium)

The original code accepted any extension, and files were served from the API origin, so an uploaded `.html` file was served as `text/html` (stored XSS).

**Fix:**
- A MIME allowlist (`image/jpeg`, `image/png`, `image/webp`).
- A fixed `.jpg` extension, so files are always served as `image/jpeg`.
- `X-Content-Type-Options: nosniff` on the static image route, so the browser won't sniff the content as something else.

### F3: No upload size limit (Low)

**Fix:** multer `limits: { fileSize: 5 MB, files: 1 }`. JSON bodies are capped at 100 kB.

Results before and after the F1–F3 fixes, using the same requests:

| Request | Before | After |
|---|---|---|
| valid image | 200 | 200 |
| `..%2F..%2F..%2Fpwn_poc` + `.js` | 200, file written outside upload dir | 400 `Invalid beer id` |
| `text/html` upload | 200, saved as `.html` | 400 `Only JPEG, PNG or WebP images are allowed` |
| 6 MB file | 200 | 400 `Image must be 5 MB or smaller` |

### F4: Credentials committed to the repository (Medium)

`backend/.env` (MySQL root password) was tracked despite being in `.gitignore`. The same password was also hardcoded in `reset_db.js`.

**Fix:**
- Removed `.env` from the repo and added [`backend/.env.example`](backend/.env.example).
- `reset_db.js` now reads credentials from the environment.
- The setup script creates `.env` from the template on first run.

**Lesson:** a committed secret stays in git history. Removing it from the tree is not enough. The credential has to be treated as compromised and rotated, and optionally purged from history (`git filter-repo`).

### F5: Committed `node_modules` and vulnerable dependencies (Medium)

`backend/node_modules` (1,273 files) was committed. That made the dependency state impossible to review and pinned vulnerable code into the repo. `npm audit` reported 9 vulnerabilities, including:

- **proxy-addr** IP spoofing (critical)
- **path-to-regexp** ReDoS (high)
- **mysql2** (high)
- **dicer** via multer 1.x (high)
- **qs** and **body-parser** DoS (moderate)

**Fix:**
- Untracked `node_modules`.
- Upgraded multer to 2.x, which removes `dicer`.
- Applied the non-breaking `npm audit fix`.

`npm audit --omit=dev` now reports **0 vulnerabilities**. The remaining findings are in `nodemon`, a dev-only tool that never runs in production.

### F6: Wildcard CORS (Low)

`cors()` with no options allowed every origin. **Fix:** the API now accepts only the origins listed in `CORS_ORIGIN` (default `http://localhost:3000`).

---

## Open issues

These are design-level gaps. I'm documenting them rather than hiding them. Fixing them properly means adding an authentication layer, which is planned below.

### O1: No authentication or server-side authorization (Critical)

The "role" picker on the home page stores `role` in `localStorage`, and the React pages check that value. Any visitor can set `localStorage.role = "admin"`. Worse, nothing on the server checks it, so every `/api/admin/*` route can be called with plain `curl`. That covers creating and editing beers, uploads, employee records including salaries, inventory, and supplier orders. `bcrypt` and `jsonwebtoken` are installed but not yet wired up.

**Planned fix:**
- Real login: bcrypt password hashes, and a short-lived JWT in an `HttpOnly` cookie.
- `requireAuth` and `requireRole('admin' | 'service')` middleware on every mutating and admin route.
- Client-side role checks kept for UX only.

### O2: Client-supplied identity / IDOR (High)

`POST /api/orders` and `POST /api/reviews/:beerId` take `customer_id` from the request body. Anyone can therefore place orders, collect loyalty points, or post reviews as any customer. The review form shows this directly: it asks the user to type in their own customer ID.

<img src="docs/screenshots/reviews.png" alt="Review form with a free-text Customer ID field" width="480">

**Planned fix:** derive the customer from the authenticated session and ignore the body field.

### O3: Client-controlled supplier price (Medium)

`placeSupplierOrder` checks that the supplier supplies the beer, but it computes `total_cost` from the `supply_price` sent by the client. The trustworthy price is already in `brandsuppliedbysupplier.supply_price`.

**Planned fix:** read the price server-side. Customer orders already do this correctly by pricing from the `beer` table.

### O4: Inventory adjustment trusts a body `pub_id` (Medium)

`PATCH /api/orders/:id/status` changes stock at the `pub_id` sent in the body, not at the order's own `pub_id`. Completing an order can therefore decrement any pub's inventory.

**Planned fix:** use `orders.pub_id` from the locked row.

### O5: No rate limiting or security headers (Low)

There is no `helmet`, no `express-rate-limit`, and no schema validation on request bodies.

**Planned fix:** add `helmet`, rate-limit the write routes, and validate bodies with a schema library such as `zod`.

---

## What was reviewed and found OK

- **SQL injection.** Every user-supplied value goes through mysql2 `?` placeholders. Dynamic SQL is built only from hardcoded column allowlists (`updateBeer`) or from names read out of `information_schema` (`getBrands`, `getPubsNeedsRestock`), never from request input.
- **Customer order pricing.** Prices come from the database, not the client. Quantities are checked to be positive, and stock is checked inside a transaction.
- **Database constraints.** `CHECK` constraints (for example rating 0–5) and foreign keys enforce integrity even if the API misses a check.
- **XSS in the React client.** No `dangerouslySetInnerHTML`. React escapes all rendered values.

## Reporting

This is a portfolio project. If you notice something I missed, please open an issue.
