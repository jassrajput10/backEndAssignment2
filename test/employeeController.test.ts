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
            
        });
    });

    // this test will create the employee
    describe("createEmployee", () => {
        it("should handle successful creation of employee", async () => {
            const mockBody = {
                name: "John Doe",
                position: "Software Developer",
                department: "IT",
                email: "john.doe@pixell-river.com",
                phone: "555-0123",
                branchId: "1"
            };

            const mockEmployee: Employee = {
                id: 30,
                ...mockBody
            };
            mockReq.body = mockBody;
            (employeeservice.createEmployee as jest.Mock).mockReturnValue(mockEmployee);

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee created successfully",
                data: mockEmployee,
            });
        });

        //this will test the missing parameters in creating employee

        it("should return 400 when required paprameters are missing", async() => {
            mockReq.body = { name: "John Doe" };

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee position is required."
            
            });
        });  
    });

    describe('updateEmployee', () => {
    it('should handle successful update', async () => {
      // Arrange
      const employeeId = 1;
      const updateData = { position: "Senior Software Developer" };
      const mockUpdatedEmployee: Employee = {
        id: employeeId,
        name: "Alice Johnson",
        position: "Senior Software Developer",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: "1"
      };
      mockReq.params = { id: employeeId.toString() };
      mockReq.body = updateData;
      (employeeservice.updateEmployee as jest.Mock).mockResolvedValue(mockUpdatedEmployee);

      // Act
      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Assert
      expect(employeeservice.updateEmployee).toHaveBeenCalledWith(employeeId, updateData);
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee data updated successfully",
        data: mockUpdatedEmployee
      });
    });

    it('should handle invalid or missing ID parameter', async () => {
    
      const updateData = { position: "Senior Developer" };
      mockReq.params = { id: "invalid" };
      mockReq.body = updateData;

      
      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid employee ID"
      });
    });

     describe('deleteEmployee', () => {
    it('should handle successful deletion', async () => {
      // Arrange
      const employeeId = 1;
      mockReq.params = { id: employeeId.toString() };
      (employeeservice.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

      // Act
      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Assert
      expect(employeeservice.deleteEmployee).toHaveBeenCalledWith(employeeId);
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: "Employee deleted successfully"
      });
    });

    it('should handle invalid or missing ID', async () => {
      // Arrange
      mockReq.params = { id: "invalid" };

      // Act
      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid employee ID"
      });
      expect(employeeservice.deleteEmployee).not.toHaveBeenCalled();
    });
  });
});

  });

  

