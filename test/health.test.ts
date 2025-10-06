import request, { Response } from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("GET /api/v1/health", () => {
    it("should return 200 OK", async () => {
       // create GET request to health endpoint
        const response: Response = await request(app).get("/api/v1/health");

        // assert response status OK and health object to have specified properties
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});