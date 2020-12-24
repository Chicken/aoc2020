const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.trim().split("\n").map(l => {
    let alg = l.match(/\(contains (.+)\)/i)[1].split(", ");
    let ing = l.split(" (")[0].split(" ")
    return { alg, ing }
});

let algs = {};

for(let food of input) {
    for(let alg of food.alg) {
        if(Object.keys(alg).includes(alg)) continue;
        algs[alg] = food.ing.filter(i => {
            return input.filter(f => {
                return f.alg.includes(alg);
            }).every(f => {
                return f.ing.includes(i);
            })
        })
    }
}

while(Object.values(algs).some(p => typeof p != "string")) {
    let [ key, [ value ] ] = Object.entries(algs).find(f => typeof f[1] != "string" && f[1].length == 1);
    algs[key] = value;
    Object.keys(algs).forEach(k => {
        if(typeof algs[k] != "string" && algs[k].includes(value)) algs[k].splice(algs[k].indexOf(value), 1)
    })
}

console.log(Object.entries(algs).sort((a,b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0).map(a => a[1]).join(","));
