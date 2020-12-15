const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map to arrays with instruction and value thats turned into number
const input = inputFile.split("\n").map(l => [l.split(" ")[0], parseInt(l.split(" ")[1])]);

// keep count of the accumulator
let acc = 0;
// memory of already executed instructions
let exec = [];
// current pointer/index
let ptr = 0;

while(true) {
    // take the instruction and value from input
    let [ ins, val ] = input[ptr];
    // if its already executed,
    // log accumalator and break out of loop
    if(exec.includes(ptr)) {
        console.log(acc);
        break;
    }
    // push the current point to memory
    exec.push(ptr);
    // switch between instructions
    switch(ins) {
        case "acc": {
            // add to acc
            acc += val;
            // increase pointer
            ptr++;
            break;
        }
        case "jmp": {
            // add value to pointer
            ptr += val;
            break;
        }
        case "nop": {
            // do nothing
            // and increase pointer
            ptr++;
            break;
        }
    }
}
