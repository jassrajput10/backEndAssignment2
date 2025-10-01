import Joi from "joi";

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

            // Joi validation for email of employees
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
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
            email: Joi.string().optional().messages({
                "string.empty": "Email cannot be empty",
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