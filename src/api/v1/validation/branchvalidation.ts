import Joi from "joi";

export const employeeSchemas = {
    // POST /api/v1/routes - Create new employees
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            
        })
    }
}