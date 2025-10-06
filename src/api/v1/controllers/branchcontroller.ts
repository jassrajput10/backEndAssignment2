import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchServices from "../services/branchservices";
import { branches } from "../../../api/v1/models/branches";
import { successResponse } from "../models/responseModel";


/**
 * Get all branches
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: branches[] = await branchServices.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branches successfully retrieved")
        );
    } catch (error: unknown) {
        next(error)
    }

};

/**
 * create branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch name is required"
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch address is required "
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch phone is required"
            });
        } else{
            // extracting all of the fields (destructuring)
                const {name, address, phone} = req.body;
            
                const newEmployee: branches = await branchServices.createBranch({name, address, phone});
                res.status(HTTP_STATUS.CREATED).json(
                    successResponse(newEmployee, "Branch created successfully")
                )
        }
    } catch (error: unknown) {
        next(error)
    }
};


/**
 * update branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        if (Number.isNaN(req.params.id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Invalid ID number"
            });
        } else if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Branch name is required"
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"branch address is required"
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Branch phone is required"
            });
        } else {
            const id = req.params.id;
            // extracting all of the fields (destructuring)
            const {name, address, phone} = req.body;

            const branchupdate: branches = await branchServices.updateBranch(id,{name, address, phone});
            res.status(HTTP_STATUS.OK).json(
                successResponse(branchupdate, "Branch updated successfully")
            )
        }
    } catch (error: unknown) {
        next(error)
    }
};


/**
 * Retrieves a single branch by ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Branch ID is required.",
      });
      return;
    }

    const branch = await branchServices.getBranchById(id);

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      message: "Branch retrieved successfully",
      data: branch,
    });
  } catch (error: unknown) {
    next(error);
  }
};


/**
 * delete branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await branchServices.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};


