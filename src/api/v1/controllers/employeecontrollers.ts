import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeservice from "../services/employeeservices"
import { Employee } from "../models/employees";

import { successResponse } from "../models/responseModel";


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
    res.status(HTTP_STATUS.OK).json(
        successResponse(employees, "Employees data retrieved successfully")
    
    );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 * this function is going to create the employee or respond with bad request if any
 * field is missing.
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if(!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee name is required.",
            });
        } if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee position is required.",
            });
        } if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee department is required.",
            }); 
        } if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee email is required.",
            });
        } if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee phone is required.",
            }); 
        } if (!req.body.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee branchId is required.",
            });
        } else {
            const { name, position, department, email, phone, branchId} = req.body;

            const newdata: Employee = await employeeservice.createEmployee({ name, position, department, email, phone, branchId });
            res.status(HTTP_STATUS.CREATED).json({
                message: "Employee created successfully",
                data: newdata,
            });
        }     
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * upadating existing employee data
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (Number.isNaN(req.params.id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Invalid ID number"
            });
        } else if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee name is required"
            });
        } else if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee position is required"
            });
        } else if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee department is required"
            });
        } else if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee email is required"
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee phone is required"
            });
        } else if (req.body.branchId === undefined || req.body.branchId === null) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee branchId is required"
            });
        } else {


        // extracting employee id
        
        const  id  = req.params.id;

        // extracting updated fields 
        const { name, position, department, email, phone, branchId } = req.body;


        const updatedEmployee: Employee = await employeeservice.updateEmployee(id, { name, position, department, email, phone, branchId });

        // sending successfull response with updated employee data
        res.status(HTTP_STATUS.OK).json({
            message: "Employee data updated successfully",
            data: updatedEmployee,
        })
        }
    } catch (error: unknown) {
        next(error);
    };
};


export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        await employeeservice.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json({
            message: "Employee deleted successfully",
        });
    } catch (error: unknown) {
        next(error);
    };
};