// test/branchController.test.ts
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as branchController from "../src/api/v1/controllers/branchcontroller";
import * as branchServices from "../src/api/v1/services/branchservices";
import { branches } from "../src/api/v1/models/branches";

jest.mock("../src/api/v1/services/branchservices");

describe("branch Controller", () => {
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

    // this test is for get all branches
    describe("getAllBranches", () => {
        it("it should handle sucessful operation", async () => {
            const mockBranches: branches[] = [
                { 
                id: "1", 
                name: "winnipeg",
                address: "123 abbotsford",
                phone: "204-134-5455",
                },
            ];
            (branchServices.getAllBranches as jest.Mock).mockReturnValue(mockBranches);

            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branches successfully retrieved",
                data: mockBranches,
            });
        });
    });

    // this is the test for create branch
    describe("createBranch", () => {
        it("should handle successful creation", async () => {
            const mockBody = { 
                name: "winnipeg",
                address: "123 abbotsford",
                phone: "204-134-5455",
            };

            const mockBranch: branches = {
                id: "2",
                ...mockBody,
            };

            mockReq.body = mockBody;
            (branchServices.createBranch as jest.Mock).mockReturnValue(mockBranch);

            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branch created successfully",
                data: mockBranch,
            });
        });

        // test with missing paramater name
        it("should return 400 when name is missing", async () => {
            mockReq.body = {
                id: "1", 
                address: "123 abbotsford",
                phone: "204-134-5455",
            };
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "branch name is required",
            });
        });
    });

    // this is the test for update branch
    describe("updateBranch", () => {
        it("should handle successful updates", async () => {
            mockReq.params = { id: "123" };
            const Body = {
                name: "winnipeg",
                address: "123 abbotsford",
                phone: "204-134-5455",
            };

            const mockBranch: branches = {
                id: "123",
                ...Body,
            };

            mockReq.body = Body;
            (branchServices.updateBranch as jest.Mock).mockReturnValue(mockBranch);

            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branch updated successfully",
                data: mockBranch,
            });
        });

        // test with missing paramater name
        it("should return 400 when name is missing", async () => {
            mockReq.params = { id: "123" };
            mockReq.body = {
                address: "123 abbotsford",
                phone: "204-134-5455",
            };
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch name is required",
            });
        });
            
    });

    describe("deleteBranch", () => {
                it("should handle successful deletion", async () => {
                mockReq.params = { id: "123" };
                (branchServices.deleteBranch as jest.Mock).mockResolvedValue(undefined);

            await branchController.deleteBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branch deleted successfully",
                data: null
        });
    });
});

});