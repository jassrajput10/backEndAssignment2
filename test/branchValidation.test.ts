import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchemas } from "../src/api/v1/validation/branchValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid branch create data", () => {
    // arrange
    mockReq.body = {
        name: "AD&D",
        address: "red river college",
        phone: "123-456-7890"
    };

    const middleware: MiddlewareFunction = validateRequest(
        branchSchemas.create
    );

    // act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();

    });

    it("should pass validation for valid branch update data", () => {
    // arrange
    mockReq.params = { id: "123" };
    mockReq.body = {
        name: "rrc polytech",
        address: "red river notre damne",
        phone: "111-1111-1111"
    };

    const middleware: MiddlewareFunction = validateRequest(
        branchSchemas.update
    );

    // act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    
    });


    it("should pass validation for valid branch delete request", () => {
    // arrange
    mockReq.params = { id: "123" };

    const middleware: MiddlewareFunction = validateRequest(
        branchSchemas.delete
    );

    // act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    });

});   


