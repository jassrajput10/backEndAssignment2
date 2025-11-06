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


/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new Branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "rrc"
 *               address:
 *                 type: string
 *                 example: "160 princess street"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Branch with this name already exists
 */

router.post(
    "/",
    validateRequest(branchSchemas.create),
    branchController.createBranch
);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update a specific branch's information
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "rrc"
 *               address:
 *                 type: string
 *                 example: "160 princess street"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Branch not found
 */
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