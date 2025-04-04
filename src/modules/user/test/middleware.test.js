const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticate, authorize } = require("../../../middlewares/authMiddleware");
const { SECRET_KEY } = require("../../../config/config");
const app = require("../../../app");


// Mocking jwt.verify
jest.mock("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ5dXZyYWpzb2xha2lAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQzNjg1NjU4LCJleHAiOjE3NDM2ODkyNTh9.4FD1DHsjV3UJl7t0HZs1Ow04PMR5MUm_ZTrkFfiC594";

describe("Middleware Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 401 when no token is provided", async () => {
        const response = await request(app).get("/api/v1/user/all-users");
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ error: "Unauthorized" });
    });


    it("should grant access with valid token", async () => {
        const mockUser = { id: 1, role: "admin", email: "yuvraj@gmail.com" };
        jwt.verify.mockReturnValue(mockUser);

        const response = await request(app)
            .get("/api/v1/user/all-users")
            .set("Authorization", token);

        expect(response.statusCode).toBe(200);
        expect({ message: response.body.message }).toEqual({ "message": "All Users Data" });
    });

    it("should grant access if user has admin role", async () => {
        const mockUser = { id: 1, role: "admin" };
        jwt.verify.mockReturnValue(mockUser);

        const response = await request(app)
            .get("/api/v1/user/all-users")
            .set("Authorization", token);

        expect(response.statusCode).toBe(200);
        expect({ message: response.body.message }).toEqual({ "message": "All Users Data" });
    });
});
