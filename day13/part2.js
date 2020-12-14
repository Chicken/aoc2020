const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")[1].split(",").map(id => parseInt(id)).map((id, index) => ({ id, index })).filter(b => b.id);

let t = 0;
let step = input[0].id;

for (let bus of input) {
    if(input.indexOf(bus) == 0) continue;
    while ((( t + bus.index ) % bus.id) != 0 ) t += step;
    step *= bus.id;
}

console.log(t);
