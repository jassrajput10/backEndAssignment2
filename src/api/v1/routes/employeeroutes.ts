import express, { Router } from "express";
import * as employeeController from "../controllers/employeecontrollers";

const router: Router = express.Router();

// routes are declare by passing the refrences her
router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;