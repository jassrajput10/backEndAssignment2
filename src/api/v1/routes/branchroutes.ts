import express, { Router  } from "express";
import { validateRequest } from "../types/middleware/validate";
import { branchSchemas } from "../validation/branchValidation";
import * as branchController from "../controllers/branchcontroller";

const router: Router = express.Router();

router.get("/", branchController.getAllBranches);
router.post(
    "/",
    validateRequest(branchSchemas.create),
    branchController.createBranch
);
router.put(
    "/:id",
    validateRequest(branchSchemas.update),
    branchController.updateBranch
);
router.delete("/:id", branchController .deleteBranch);

export default router;