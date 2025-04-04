const { userSchema, loginSchema, fileSchema } = require("./validation");
const { createNewuser, validateUserLogin, findFileStats, hashFileData, allUsersData } = require("./service");

async function createUser(req, res) {
    try {
        // Validate the input
        const { error } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newUser = await createNewuser(req.body);
        if (newUser.status == 200) {
            return res.status(201).json({
                message: "User added successfully",
                data: newUser.data
            });
        }

        res.status(500).json({
            message: "Internal Server Error"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const loginData = req.body;

        const { error } = loginSchema.validate(loginData);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const loggedInUser = await validateUserLogin(loginData);
        if (loggedInUser.status == 200) {
            return res.status(200).json({
                message: "Logged In successfully",
                data: loggedInUser.data
            });
        }

        res.status(401).json({
            message: "Invalid Email or Password"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getFileInformation(req, res) {
    try {
        const { error } = fileSchema.validate({ file: req.file });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { path: filePath } = req.file;

        const fileInfo = await findFileStats(filePath);

        if (fileInfo.status == 200) {
            return res.status(200).json({
                message: "File information extracted",
                data: fileInfo.data
            })
        }
        return res.status(500).json({
            message: "Internal Error"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Error"
        })
    }
}

async function hashFileContent(req, res) {
    try {
        const { error } = fileSchema.validate({ file: req.file });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { path: filePath } = req.file;

        const fileInfo = await hashFileData(filePath);

        if (fileInfo.status == 200) {
            return res.status(200).json({
                message: "File Content hashed",
                data: fileInfo.data
            })
        }
        return res.status(500).json({
            message: "Internal Error"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Error"
        })
    }
}

async function getAllUsers(req, res) {
    try {
        const usersData = await allUsersData();

        if (usersData.status == 200) {
            return res.status(200).json({
                message: "All Users Data",
                data: usersData.data
            });
        }

        return res.status(200).json({
            message: "Unable to get Users data",
            data: []
        });
    } catch (error) {
        console.log("Error getting Users " + error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { createUser, loginUser, getFileInformation, hashFileContent, getAllUsers };
