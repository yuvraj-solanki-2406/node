const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const { generateToken } = require("../auth/authToken.js");
const { getFileInformation, hashTextContnet } = require("../../utils/files.js");


const userDataFilePath = path.join(__dirname, "../../../data/dummyData.json");

let userDummyData = [];

async function loadUserData() {
    try {
        const data = await fs.readFile(userDataFilePath, "utf-8");
        userDummyData = JSON.parse(data);
    } catch (err) {
        console.log("Error reading the file data: " + err);
        userDummyData = []; // Fallback to empty array
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const createNewuser = async (userData) => {
    await loadUserData();
    try {
        const userId = userDummyData.length + 1;
        const role = "user";
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;

        userDummyData.push({ id: userId, ...userData, role });
        await fs.writeFile(userDataFilePath, JSON.stringify(userDummyData, null, 2), "utf-8");

        const { password, ...returninguserData } = userData;
        return {
            status: 200,
            data: { id: userId, ...returninguserData }
        };
    } catch (error) {
        console.log("Error registering a User: " + error);
        return {
            status: 500,
            data: null,
        };
    }
};

const validateUserLogin = async (userLoginData) => {
    await loadUserData();

    try {
        const { email, password } = userLoginData;

        for (const userInfo of userDummyData) {
            if (userInfo.email === email) {
                const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
                if (isPasswordCorrect) {
                    const userTokenData = { id: userInfo.id, email: userInfo.email, role: userInfo.role };
                    const token = generateToken(userTokenData);

                    return {
                        status: 200,
                        data: token,
                    };
                }
            }
        }

        return { status: 401 };
    } catch (error) {
        console.log("Error validating user login: " + error);
        return { status: 500 };
    }
};

const findFileStats = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");

        const { totalWords, totalLines } = getFileInformation(data);
        return {
            status: 200,
            data: { totalWords, totalLines },
        };
    } catch (error) {
        console.log("Error reading file: " + error);
        return {
            status: 500,
            data: null,
        };
    }
};

const hashFileData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");

        const hashedContent = hashTextContnet(data);
        return {
            status: 200,
            data: hashedContent,
        };
    } catch (error) {
        console.log("Error reading file: " + error);
        return {
            status: 500,
            data: null,
        };
    }
};

const allUsersData = async () => {
    await loadUserData();

    return {
        status: 200,
        data: userDummyData,
    };
};

module.exports = { createNewuser, validateUserLogin, findFileStats, hashFileData, allUsersData };
