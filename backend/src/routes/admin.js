import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createBeer, updateBeer, upsertPubHasBeer, getAllInventory, updateInventory, getEnums, getEmployees, createEmployee, updateEmployee, deleteEmployee, uploadBeerImage, getSuppliersForBrand, placeSupplierOrder, getSupplierOrders, updateSupplierOrderStatus } from "../controllers/adminController.js";

const router = express.Router();

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'beers');
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// The upload folder is gitignored, so make sure it exists on a fresh clone
fs.mkdirSync(IMAGE_DIR, { recursive: true });

// Only accept a positive integer beer id; it becomes part of the filename on disk
const requireNumericId = (req, res, next) => {
	if (!/^[1-9]\d*$/.test(req.params.id)) {
		return res.status(400).json({ error: 'Invalid beer id' });
	}
	next();
};

// multer storage that names files as <beerId>.jpg into backend/public/images/beers.
// The extension is fixed server-side (never taken from the client's filename) so an
// upload can't be stored as .html/.js or escape the directory.
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, IMAGE_DIR),
	filename: (req, file, cb) => cb(null, `${req.params.id}.jpg`),
});
const upload = multer({
	storage,
	limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
	fileFilter: (req, file, cb) => {
		if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
			return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'));
		}
		cb(null, true);
	},
});

const handleUpload = (req, res, next) => {
	upload.single('image')(req, res, (err) => {
		if (!err) return next();
		if (err instanceof multer.MulterError) {
			const msg = err.code === 'LIMIT_FILE_SIZE'
				? 'Image must be 5 MB or smaller'
				: 'Only JPEG, PNG or WebP images are allowed';
			return res.status(400).json({ error: msg });
		}
		next(err);
	});
};

router.post("/beers", createBeer);
router.put("/beers/:id", updateBeer);
router.post("/beers/:id/image", requireNumericId, handleUpload, uploadBeerImage);
router.post("/pubhasbeer", upsertPubHasBeer);
router.get("/inventory", getAllInventory);
router.put("/inventory/:pub_id/:beer_id", updateInventory);
router.get("/enums", getEnums);

// Employee routes
router.get("/employees", getEmployees);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

// Supplier ordering routes
router.get("/suppliers/brand/:brandId", getSuppliersForBrand);
router.post("/supplier-orders", placeSupplierOrder);
router.get("/supplier-orders", getSupplierOrders);
router.put("/supplier-orders/:id", updateSupplierOrderStatus);

export default router;
