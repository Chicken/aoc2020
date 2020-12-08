const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")

let ids = [];

for(let str of input) {
    ids.push(parseInt(str.replace(/./g, c => {
        switch(c) {
            case "F":
            case "L":
                return 0;
            case "B":
            case "R":
                return 1;
        }
    }), 2))
}

for(let i = Math.min(...ids); i < Math.max(...ids); i++) {
    if(ids.indexOf(i) == -1) console.log(i);
}