import { Request, Response } from 'express';


export const branchController = {
  getAllBranches: async (req: Request, res: Response) => {
    try {
      const branches = await getAllBranches();
      res.status(200).json({
        success: true,
        data: branches,
        count: branches.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }