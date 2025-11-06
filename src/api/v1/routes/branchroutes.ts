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


/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieve a specific branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 *
 */
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