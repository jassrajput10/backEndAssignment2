import express, { Express, Request, Response } from "express";
import helmet from "helmet";
// Importing morgan
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeroutes"
import branchRoutes from "./api/v1/routes/branchroutes"
import dotenv from "dotenv";

// Load environment variables BEFORE you internal imports!
dotenv.config();

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());
// Apply basic Helmet security
app.use(helmet());



// Interface for health check response
// An interface in TypeScript defines the structure or "shape" of an object.
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// Middleware END

// respond to GET request at endpoint "/" with message
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1/routes", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);


export default app;