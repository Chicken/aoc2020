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

console.log(input.reduce((total, f) => {
    return total + f.ing.filter(i => {
        return !Object.values(algs).some(a => a.includes(i));
    }).length;
}, 0))
