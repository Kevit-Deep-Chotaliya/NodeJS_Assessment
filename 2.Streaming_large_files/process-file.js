const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("large.txt", {
    encoding: "utf8"
});

const rl = readline.createInterface({
    input: fileStream,
});

let totalLines = 0;
let totalCharacters = 0;

const searchWord = "streams";

rl.on("line", (line) => {
    totalLines++;

    totalCharacters += line.length;
});

rl.on("close", () => {
    console.log("File processing completed!");
    console.log("Total lines:", totalLines);
    console.log("Total characters:", totalCharacters);
});

fileStream.on("error", (err) => {
    console.error("File error:", err.message);
});