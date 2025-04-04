const crypto = require("crypto");


function getFileInformation(content) {
    const totalWords = content.split(/\s+/).length;
    const totalLines = content.split("\n").length;
    return { totalWords, totalLines };
}


function hashTextContnet(data) {
    const hash = crypto.createHash("sha256").update(data).digest("hex");

    return hash
}


module.exports = { getFileInformation, hashTextContnet }