const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config.js");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decodedUseInfo = jwt.verify(token, SECRET_KEY);
        req.user = decodedUseInfo;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({ error: "Invalid token" });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};


module.exports = { authenticate, authorize }