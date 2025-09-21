import express, { Router } from "express";
import * as employeeController from "../controllers/employeecontrollers";

const router: Router = express.Router();

// routes are declare by passing the refrences her
router.get("/", employeeController.getAllEmployees);
router.get("/", employeeController.createEmployee);
router.get("/:id", employeeController.updateEmployee);
router.get("/:id", employeeController.deleteEmployee);

export default router;