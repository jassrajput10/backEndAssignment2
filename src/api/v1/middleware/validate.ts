import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../../types/express";
import { HTTP_STATUS } from "../../../../constants/httpConstants";

/**
 * describe the interface requestchema for the parts to validated
 * when HTTP request to mach the expected structure of the data,
 *  ? used because they are optional
 */
interface RequestSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

/**
 * describe the interface validationOptions
 * they will strip the body, query and params when set to true 
 * this will strip the values that shouldn't be in schema  
 */
interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripparams?: boolean;
}

/** Created an Express middleware function  that validates the incoming request based on provided schemas
 * 
 * @param schemas - An object containing validation schema for request body, params, and query
 * @param validation - Validation options for stripping request payloads
 * @returns Express middleware function that perfoms validation
 */
export const validateRequest = (
    schemas: RequestSchema,
    validation: ValidationOptions = {}
): MiddlewareFunction => {
    const STRIP_BODY: boolean = true;
    const STRIP_PARAMS: boolean = true;
    const STRIP_QUERY: boolean = false;

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors: string[] = [];

            /**
             * 
             * Validates a specific part of the request (body, params, or query) against a Joi schema.
             * Collects validation errors and optionally strips unknown fields from the data.
             * @param requestSchema - Joi schema to validate against
             * @param requestdata - request data to validate like req.body, req.params or req.query
             * @param requestSection - name of the part of error prefixing
             * @param shouldStripData - Whether to strip unknown fields from the validated data
             * @returns The original data if validation fails or stripping is disabled, otherwise the stripped/validated data
             */
            const ValidateRequestSection = (
                requestSchema: ObjectSchema,
                requestdata: unknown,
                requestSection: string,
                shouldStripData: boolean

            ) => {
                const { error, value: strippedData } = requestSchema.validate(requestdata, {
                    // abortEarly: false means it will not stop validation at first error, it will continue validation
                    abortEarly: false,
                    stripUnknown: shouldStripData,
                });
                
                // this will show the detail of the error in the functions
                if(error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => `${requestSection}: ${detail.message}`
                        )
                    );

                } else if (shouldStripData) {
                    return strippedData;
                }

                return requestdata;
            };

            //validates the body string paramters
            if (schemas.body) {
                req.body = ValidateRequestSection(
                    schemas.body,
                    req.body,
                    "Body",
                    validation.stripBody ?? STRIP_BODY
                );
            }

            // validates the params string parameters
            if (schemas.params) {
                req.params = ValidateRequestSection(
                    schemas.params,
                    req.params,
                    "Params",
                    validation.stripparams ?? STRIP_PARAMS
                );
            }

            //validates the query string parameters
            if (schemas.query) {
                req.query = ValidateRequestSection(
                    schemas.query,
                    req.query,
                    "Query",
                    validation.stripQuery ?? STRIP_QUERY
                );
            }

            // this wil return a error response is any validations are found.
            if(errors.length > 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Validation error: ${errors.join(", ")}`,
                });
            }
            next();
        } catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Request validation failed for unknown reason",
            });
        }
    };
};


