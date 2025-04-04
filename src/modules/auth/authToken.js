const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config.js");

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { generateToken };
