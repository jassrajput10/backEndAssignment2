import Joi from "joi";



/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an Employee
 *           example: "emp123abc"
 *         name:
 *           type: string
 *           description: The name of the Employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: The position of the Employee
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           description: The department of the Employee
 *           example: "Engineering"
 *         email:
 *           type: string
 *           description: The email of the Employee
 *           example: "john.doe@company.com"
 *         phone:
 *           type: string
 *           description: The phone number of the Employee
 *           example: "+1234567890"
 *         branchId:
 *           type: string
 *           description: The branch ID the Employee belongs to
 *           example: "branch456xyz"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the Employee was created
 *           example: "2025-01-01T12:00:00"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the Employee was last updated
 *           example: "2025-01-01T12:00:00"
 */
/**
 * Employee schema organised bt request type
 * This validation will ensure that required fields are present and filled according to the given requirements
 */
export const employeeSchemas = {
    // POST /api/v1/routes - Create new employees
    create: {
        body: Joi.object({

            // Joi validation for name of employees
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),

            // Joi validation for the position of employees
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),

            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),

            // Joi validation for email of employees
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),

            phone: Joi.string().required().messages({
                "any.required": "Phone is required",
                "string.empty": "Phone cannot be empty",
            }),

            // Joi valdation for branchId of employees
            branchId: Joi.string().required().messages({
                "any.required": "branchId is required",
                "string.empty": "branchId cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/routes/:id Update employee
update: {
    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Employee ID is required",
            "string.empty": "Employee ID cannot be empty",
        }),
    }),
    body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().optional().messages({
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().optional().messages({
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone cannot be empty",
            }),
            branchId: Joi.string().optional().messages({
                "string.empty": "BranchId cannot be empty",
            }),    
                    
        }),    
    },

     // PUT /api/v1/routes/:id delete employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },

};