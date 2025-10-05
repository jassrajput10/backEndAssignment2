import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchemas } from "../src/api/v1/validation/employeeValidation";
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

    it("should pass validtion for valid employee data", () => {
        // arrange
        mockReq.body = {
            name: "Hello",
            position: "student",
            department: "AD&D",
            email: "hello@gmail.com",
            phone: "111-111-1111",
            branchId: "1",

        };

        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.create
        );

        // act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();

    });

    it("should pass validation for valid employee update data", () => {
    // arrange
    mockReq.params = { id: "123" };
    mockReq.body = {
        name: "hello world",
        position: "student",
        department: "AD&D",
        email: "hello@email.com",
        phone: "222-222-2222",
        branchId: "2"
    };

    const middleware: MiddlewareFunction = validateRequest(
        employeeSchemas.update
    );

    // act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
});


    it("should pass validation for valid employee delete request", () => {
        // arrange
        mockReq.params = { id: "123" };

        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.delete
        );

        // act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });



});    