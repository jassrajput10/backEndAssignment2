import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeecontroller";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { getEmployeeById } from "src/api/v1/services/employeeservices";


jest.mock("../src/api/v1/controllers/employeecontroller", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

// this will clear all jest mocks after each test
describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    
    describe("GET /api/v1/routes/", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/routes/");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/routes/", () => {
        it("should call createEmployee controller with valid data", async() => {
            const mockEmployee = {
                name: "Test name",
                position: "Test position",
                department: "Test department",
                email: "Test email",
                phone: "Test phone",
                branchId: "Test branchid",
            };

            await request(app).post("/api/v1/routes/").send(mockEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

       describe("PUT /api/v1/routes/:id", () => {
        it("should call updateemployee controller with valid data", async () => {
            const mockEmployee = {
              name: "updated name",
                position: "updated position",
                department: "updated department",
                email: "updated email",
                phone: "updated phone",
                branchId: "updated branchid",
            }; 

            await request(app).put("/api/v1/routes/testId").send(mockEmployee);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

     describe("DELETE /api/v1/routes/:id", () => {
        it("should call deleteemployee controller with valid data", async () => {
            await request(app).delete("/api/v1/routes/testId");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
});

