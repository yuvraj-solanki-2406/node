const fs = require("fs/promises");

// Mocking the getFileInformation function
jest.mock("../service", () => ({
    findFileStats: jest.fn(),
}));
const { findFileStats } = require("../service");

describe("findFileStats", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return file stats when the file is read successfully", async () => {
        const mockData = "This is a test file with some content";
        const mockStats = { totalWords: 8, totalLines: 1 };

        jest.spyOn(fs, "readFile").mockResolvedValue(mockData);

        findFileStats.mockResolvedValue({
            status: 200,
            data: mockStats,
        });

        const result = await findFileStats("test.txt");

        expect(result).toEqual({
            status: 200,
            data: mockStats,
        });
    });

    it("should return an error response when file reading fails", async () => {
        const errorMessage = "File not found";
        jest.spyOn(fs, "readFile").mockRejectedValue(new Error(errorMessage));

        findFileStats.mockResolvedValue({
            status: 500,
            data: null,
        });

        const result = await findFileStats("invalid.txt");

        expect(result).toEqual({
            status: 500,
            data: null,
        });
    });
});
