import Joi from "joi";

export const employeeSchemas = {
    // POST /api/v1/routes - Create new employees
    create: {
        body: Joi.object({

            // Joi validation for name for employees
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),

            // Joi validation for the position for employees
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),

            // Joi validation for email for employees
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),

            
        })
    }
}