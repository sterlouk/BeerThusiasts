import express from "express";
import { getPubs, getPubsNeedsRestock } from "../controllers/pubsController.js";

const router = express.Router();

router.get("/", getPubs);
router.get("/needs-restock", getPubsNeedsRestock);

export default router;
