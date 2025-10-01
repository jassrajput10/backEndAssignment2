import Joi, { any } from "joi";

export const branchSchemas = {
    // POST /api/v1/branches - Create new branch

    create: {

        // Joi validation for name of branches
        name: Joi.string().required().messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
        }),
        
        // Joi validation for address of branches
        address: Joi.string().required().messages({
            "any.required": "Address is required",
            "string.empty": "Address cannot be empty",
        }),
        
        // Joi validation for phone of branches
        phone: Joi.string().required().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty", 
        }),

    },

    // PUT 

}

