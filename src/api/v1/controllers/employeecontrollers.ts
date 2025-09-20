import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";
import * as employeeservice from "../services/employeeservices"
import { Employee } from "../models/employees";
import { employees } from "src/data/employees";


/**
 * Manages requests and reponses to retrieve all employees
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 * this manages requests and responses to retrieve all employees data.
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
    const employees: Employee[] = await employeeservice.getAllEmployees();
    res.status(HTTP_STATUS.OK).json({
        message: "Employees data retrieved successfully",
        data: employees,
    });
    } catch (error: unknown) {
        next(error);
    }
};