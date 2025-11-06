import express, { Router  } from "express";
import * as branchController from "../controllers/branchcontroller";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/branchValidation";

const router: Router = express.Router();


/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieves a list of branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of Branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *
 */
router.get("/", branchController.getAllBranches);
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