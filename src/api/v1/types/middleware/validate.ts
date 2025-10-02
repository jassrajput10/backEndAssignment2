import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../../types/express";
import { HTTP_STATUS } from "../../../../constants/httpConstants";


interface RequestSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}
 
interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripparams?: boolean;
}
