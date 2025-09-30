import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchcontroller";
import { HTTP_STATUS } from "../src/constants/httpConstants";




jest.mock("../src/api/v1/controllers/branchcontroller", () => ({
    getAllBranches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Employee routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // this is the test for get all branches
    describe("GET /api/v1/branch/", () => {
        it("should call getAallEmployees controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });
    
    
    // this is the test for create branch with valid data
    describe("POST /api/v1/branch/", () => {
        it("should call createbranch controller", async () => {
            const body = {
                name: "harsh",
                address: "98 Elsbury Bay",
                phone: "204-223-1244",

            };
            await request(app).post("/api/v1/branches/").send(body);
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    
    // this test is for update branches
    // this is the test for create branch with valid data
    describe("POST /api/v1/branch/:id", () => {
        it("should call update controller", async () => {
            const mockbody = {
                name: "harsh",
                address: "98 Elsbury Bay",
                phone: "204-223-1244",

            };
            await request(app).put("/api/v1/branches/123").send(mockbody);
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });


    // this test is for deleting branches
    describe("DELETE /api/v1/branch/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/branches/123");
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });

});
