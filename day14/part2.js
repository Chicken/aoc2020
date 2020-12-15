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
    // return object with type, index with the last ] removed, turned into binary
    // and padded to length of 36 with 0's, and value parsed into int
    return { type, index: parseInt(index.substring(0, index.length - 1)).toString("2").padStart(36, "0").split(""), value: parseInt(ins[1]) };
});

// function to generate all the possible indexes from binary with wildcards (x's)
function generateIndexes(start, bitmask) {
    // if bitmask is present we replace values in the first
    // value with values from the bitmask when necesary
    if(bitmask) {
        start = start.map((v, i) => {
            // if bitmask has 0 we just use the current value
            if(bitmask[i] == "0") return v;
            // but if its 1 or x we replace it
            else return bitmask[i];
        })
    }
    // find first appearance of x
    let i = start.indexOf("X");
    // if there is no appearance of x, return the current index
    if(i == -1) return [ start.join("") ];
    // array to keep all the possible combinations
    let indexes = [];
    // try 0
    start[i] = "0";
    // generate all indexes for that and add to the total
    indexes = indexes.concat(generateIndexes([...start]));
    // try 1
    start[i] = "1";
    // generate all indexes for that and add to the total
    indexes = indexes.concat(generateIndexes([...start]));
    // return total
    return indexes;
}

// memory and mask variables
let mem = {};
let mask = [];

// loop every instruction
for(let ins of input) {
    // switch on instruction type
    switch(ins.type) {
        case "mem": {
            // generate all the possible indexes for this wildcard
            let indexes = generateIndexes(ins.index, mask);
            // loop all those
            for(let index of indexes) {
                // set the indexes to value
                mem[index] = ins.value;
            }
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
console.log(Object.values(mem).reduce((a,b)=>a+b,0));
