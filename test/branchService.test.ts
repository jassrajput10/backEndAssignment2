import * as branchService from "../src/api/v1/services/branchservices";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { branches } from "../src/api/v1/models/branches";

// Mock the entire firestore repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branch Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a branch successfully", async () => {
        // Arrange
        const mockBranchData: {
            name: string;
            address: string;
            phone: string;
        } = {
            name: "Test Branch",
            address: "123 street",
            phone: "212-444-444"
        };

        const mockDocumentId = "test-branch-id";

        // Mock the Firestore createDocument function
        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: branches = await branchService.createBranch(mockBranchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "branchData",
            expect.objectContaining(mockBranchData)
        );

        expect(result).toEqual({
            ...mockBranchData,
            id: mockDocumentId
        });
    });
});
