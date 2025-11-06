import express, { Router } from "express";
import * as employeeController from "../controllers/employeecontroller";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";

const router: Router = express.Router();


/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// routes are declare by passing the refrences her
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * get: 
 *    summary: retrieve a specific employee by id
 *    tags: [Employees]
 *    parameters:
 *      - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *
 */
router.get("/:id", employeeController.getEmployeeById)

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "jss"
 *               position:
 *                 type: string
 *                 example: "student"
 *               department:
 *                 type: string
 *                 example: "ad&d"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jass@rrc,ca"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               branchId:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Employee with this email already exists
 */
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