import express from "express";
import { createBeer, updateBeer, upsertPubHasBeer, getEnums, getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/adminController.js";

const router = express.Router();

router.post("/beers", createBeer);
router.put("/beers/:id", updateBeer);
router.post("/pubhasbeer", upsertPubHasBeer);
router.get("/enums", getEnums);

// Employee routes
router.get("/employees", getEmployees);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
