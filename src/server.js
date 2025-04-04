const http = require("http");
require("dotenv").config();


const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
