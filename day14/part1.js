const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split input by newline
// split lines by =
// map that into objects of type, index (for mem) and value
const input = inputFile.split("\n").map(l => l.split(" = ")).map(ins => {
    // if type is mask, return mask and value turned into array
    if(ins[0] == "mask") return { type: "mask", value: ins[1].split("") };
    // get type and index by splitting with [ 
    let [ type, index ] = ins[0].split("[");
    // return object with type, index with the last ] removed and parsed into int
    // and value parsed into int, turned into binary, and padded to length of 36 with 0's
    return { type, index: parseInt(index.substring(0, index.length - 1)), value: parseInt(ins[1]).toString(2).padStart(36, "0") };
});

// memory and mask variables
let mem = {};
let mask = [];

// loop every instruction
for(let ins of input) {
    // switch on instruction type
    switch(ins.type) {
        case "mem": {
            // split value into array
            let val = ins.value.split("");
            // loop every bit in mask
            mask.forEach((bit, i) => {
                // if its x, do nothing
                if(bit == "X") return;
                // otherwise replace bit in value
                // with value from mask
                val[i] = bit;
            })
            // set memory at index to int from parsing the binary
            mem[ins.index] = parseInt(val.join(""), 2);
            break;
        }
        case "mask": {
            // change mask to value
            mask = ins.value;
            break;
        }
    }
}

// sum up all the values with reduce
console.log(Object.values(mem).reduce((a,b)=>a+b));
