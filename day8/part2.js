const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map to arrays with instruction and value thats turned into number
const input = inputFile.split("\n").map(l => [l.split(" ")[0], parseInt(l.split(" ")[1])]);

// function to run set of instructions
function emulate(inp) {
    // keep count of the accumulator
    let acc = 0;
    // memory of already executed instructions
    let exec = [];
    // current pointer/index
    let ptr = 0;
    // loop till we hit the end
    while(true) {
        // test if pointer is larger than set
        // of instructions and return acc
        if(ptr >= inp.length) {
            return  acc;
        }
        // destructer input to instruction and value
        let [ ins, val ] = inp[ptr];
        // if we hit an already hit pointer
        // we are stuck in a loop
        // return null
        if(exec.includes(ptr)) {
            return null;
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

}

// filter out all the canditates to be replaced
// these are all the jmps and nops
let candidates = input.filter(e => (e[0] == "jmp" || e[0] == "nop"))

// loop all canditates
for(let cand of candidates) {
    // find the index that it is at
    let index = input.indexOf(cand);
    // copy the original input
    let copy = JSON.parse(JSON.stringify(input))
    // switch the candidate
    copy[index][0] = (cand[0] == "jmp" ? "nop" : "jmp");
    // emulate this copy
    let result = emulate(copy);
    // if it returns null we continue
    // and try next candidate
    if(result == null) continue;
    // otherwise log the result
    console.log(result)
    // and exit
    process.exit();
}
