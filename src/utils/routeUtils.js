const { userRouter } = require("../modules/user/userRoutes")

function registerRoutes(app) {
    app.use("/api/v1/user", userRouter);
}

module.exports = { registerRoutes }
