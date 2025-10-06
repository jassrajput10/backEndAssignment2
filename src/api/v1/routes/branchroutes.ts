import express, { Router  } from "express";
import * as branchController from "../controllers/branchcontroller";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/branchValidation";

const router: Router = express.Router();

router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
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
router.delete(
    "/:id",
    validateRequest(branchSchemas.delete),
    branchController.deleteBranch
);

export default router;