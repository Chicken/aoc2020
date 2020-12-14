const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n");

let estTime = parseInt(input[0]);
let time = estTime;
let busses = input[1].split(",").map(v=>parseInt(v)).filter(_=>_)

while(true) {
    if(busses.some(b => time % b == 0)) {
        let bus = busses.find(b => time % b == 0)
        console.log(bus * (time - estTime));
        break;
    }
    time++;
}
