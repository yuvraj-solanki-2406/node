const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const { registerRoutes } = require("./utils/routeUtils")

const app = express();


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Please limit the request to 10 requests per minute"
});

// Middleware configuration
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app)

module.exports = app;
