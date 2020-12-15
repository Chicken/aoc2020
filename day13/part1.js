const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newline
const input = inputFile.split("\n");

// parse estimated time from first line
let estTime = parseInt(input[0]);
// initalize time
let time = estTime;
// array of busses, split by , parse numbers and remove not numbers
let busses = input[1].split(",").map(v=>parseInt(v)).filter(_=>_)

// loop forever
while(true) {
    // if some bus departs at this time
    if(busses.some(b => time % b == 0)) {
        // find it
        let bus = busses.find(b => time % b == 0)
        // and log its id multiplied by waiting time
        console.log(bus * (time - estTime));
        break;
    }
    // increase time
    time++;
}
