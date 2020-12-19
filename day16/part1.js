const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n");

const ranges = input[0].split("\n").map(r => ({name: r.split(": ")[0], ranges: r.split(": ")[1].split(" or ").map(r => ({min: parseInt(r.split("-")[0]), max: parseInt(r.split("-")[1])}))}));
const myticket = input[1].split("\n")[1].split(",").map(Number);
const others = input[2].split("nearby tickets:\n")[1].split("\n").map(t => t.split(",").map(Number));

console.log(others.reduce((total, ticket) => {
    for(let field of ticket) {
        if(!ranges.some(range => {
            return range.ranges.some(r => {
                return field >= r.min && field <= r.max;
            })
        })) total += field;
    }
    return total;
}, 0))
