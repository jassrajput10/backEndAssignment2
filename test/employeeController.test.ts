import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeController from "../src/api/v1/controllers/employeecontrollers";
import * as employeeservice from "../src/api/v1/services/employeeservices";
import { Employee } from "../src/api/v1/models/employees"; 
import { mock } from "node:test";

jest.mock("../src/api/v1/services/employeeservices");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // reusable mocks for any controller tests
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    // test for successfull retrieval of get all employees
    describe("getaAllEmployees", () => {
        it("should handle successfull operation", async () => {
            const mockEmployees: Employee[] = [
                {
                    id: 1,
                    name: "Alice Johnson",
                    position: "Branch Manager",
                    department: "Management",
                    email: "alice.johnson@pixell-river.com",
                    phone: "604-555-0148",
                    branchId: "1"
                }
            ];
            (employeeservice.getAllEmployees as jest.Mock).mockReturnValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenNthCalledWith(1, {
                message: "Employees data retrieved successfully",
                data: mockEmployees,
            });
        });

        // test for error handling for getallemployees
        it("should handle errors", async () => {
            const mockError = new Error("Test error");
            (employeeservice.getAllEmployees as jest.Mock).mockRejectedValue(mockError);

            await employeeController.getAllEmployees(mockReq as Request,
                mockRes as Response, 
                mockNext);
            

            expect(mockNext).toHaveBeenCalledWith(mockError);
            
        })
    });
})