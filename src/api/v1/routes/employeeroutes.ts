import express, { Router } from "express";
import * as employeeController from "../controllers/employeecontrollers";
import { validateRequest } from "../types/middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";

const router: Router = express.Router();

// routes are declare by passing the refrences her
router.get("/", employeeController.getAllEmployees);
router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeeController.createEmployee
);
router.put(
    "/:id",
    validateRequest(employeeSchemas.update),
    employeeController.updateEmployee
);
router.delete(
    "/:id",
    validateRequest(employeeSchemas.delete),
    employeeController.deleteEmployee
);

export default router;