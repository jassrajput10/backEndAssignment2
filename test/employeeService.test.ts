import * as employeeservice from "../src/api/v1/services/employeeservices";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employees";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        // Arrange
        const mockEmployeeData: {
            name: string;
            position: string;
            department: string;
            email: string;
            phone: string;
            branchId: string;
        } = {
            name: "Test Employee",
            position: "Test position",
            department: "Test department",
            email: "Test email",
            phone: "Test phone",
            branchId: "Test branchId",
        };
        const mockDocumentId: string = "test-employee-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Employee = await employeeservice.createEmployee(mockEmployeeData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            expect.objectContaining({
                name: mockEmployeeData.name,
                position: mockEmployeeData.position,
                department: mockEmployeeData.department,
                email: mockEmployeeData.email,
                phone: mockEmployeeData.phone,
                branchId: mockEmployeeData.branchId,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });



});    