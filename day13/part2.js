const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")[1].split(",").map(id => parseInt(id)).map((id, index) => ({ id, index })).filter(b => b.id);

// start from the beginning
let t = 0;
// first step by the id of first bus
// and skip it from later loop
let step = input.shift().id;

// loop all busses
for (let bus of input) {
    // increase time by step untill we meet a place in time
    // where the current bus joins the pattern of current step
    while ((( t + bus.index ) % bus.id) != 0 ) t += step;
    // multiply step by bus id
    step *= bus.id;
}

// log the time
console.log(t);
