import Joi, { any } from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Branch
 *           example: "branch123abc"
 *         name:
 *           type: string
 *           description: The name of the Branch
 *           example: "exchange district Branch"
 *         address:
 *           type: string
 *           description: The address of the Branch
 *           example: "160 princess street"
 *         phone:
 *           type: string
 *           description: The phone number of the Branch
 *           example: "1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the Branch was created
 *           example: "2025-01-01T12:00:00"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the Branch was last updated
 *           example: "2025-01-01T12:00:00"
 */
/**
 * Branch schema organised bt request type
 * This validation will ensure that required fields are present and filled according to the given requirements
 */
export const branchSchemas = {
    // POST /api/v1/branches - Create new branch

    create: {
        body: Joi.object({

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
    }),  

    },

       // PUT /api/v1/branches/:id  update branch employee
   update: {
       params: Joi.object({
           id: Joi.string().required().messages({
               "any.required": "Branch ID is required",
               "string.empty": "Branch ID cannot be empty",
           }),
       }),
       body: Joi.object({
               name: Joi.string().optional().messages({
                   "string.empty": "Name cannot be empty",
               }),
               address: Joi.string().optional().messages({
                   "string.empty": "address cannot be empty",
               }),
               phone: Joi.string().optional().messages({
                   "string.empty": "phone cannot be empty",
               }),
                 
                       
           }), 
    },


     // PUT /api/v1/branches/:id  delete branch employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },
};

