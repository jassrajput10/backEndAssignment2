import Joi from "joi";

export const branchSchemas = {
    // POST /api/v1/branches - Create new branch

    create: {

        // Joi validation for name of branches
        name: Joi.string().required().messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
        }),
        
    }
}