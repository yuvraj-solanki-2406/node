const request = require("supertest");
const app = require("../../../app");
const fs = require("fs/promises");


jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ5dXZyYWpzb2xha2lAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQzNzQ4OTcwLCJleHAiOjE3NDM3NTI1NzB9.prtWtDvYrg1PJrmBeBA1LMaMrQTe38tEx3DpAvJ0MrA";

const testUserData = {
    "first_name": "yuvraj",
    "last_name": "solanki",
    "email": "yuvraj@gmail.com",
    "password": "yuvraj1234",
    "gender": "Male",
    "job_title": "Engineer"
};

const loginTestUserData = {
    "email": "yuvraj@gmail.com",
    "password": "yuvraj1234"
}


describe("GET /api/v1/user/all-users", () => {
    it("should return all users", async () => {
        // Mocking the file read to return some test data
        fs.readFile.mockResolvedValue(JSON.stringify([testUserData]));

        const response = await request(app)
            .get("/api/v1/user/all-users")
            .set("Authorization", `${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});

describe("POST /api/v1/user/create-user", () => {
    it("should create a new user and return json object with message and data", async () => {
        // Mock the file read and write functions
        fs.readFile.mockResolvedValue(JSON.stringify([]));
        fs.writeFile.mockResolvedValue();

        const response = await request(app)
            .post("/api/v1/user/create-user")
            .send(testUserData)

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("first_name", "yuvraj");
        expect(fs.writeFile).toHaveBeenCalledTimes(1);
    });
});

describe('POST /api/v1/user/login', () => {
    it("should authenticate the user and return JWT token", async () => {
        testUserData.password = "$2b$10$EgbV9qko5qOJE4unjS.rFuX0KgX..ASYA95aShp3AWSlBGjYkBBve"
        fs.readFile.mockResolvedValue(JSON.stringify([testUserData]));

        const response = await request(app)
            .post("/api/v1/user/login")
            .send(loginTestUserData)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        // expect(response.body.data).toHaveProperty("first_name", "yuvraj");
        // expect(fs.readFile).toHaveBeenCalledTimes(1);
    })
})
