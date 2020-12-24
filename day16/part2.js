const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n");

const ranges = input[0].split("\n").map(r => ({name: r.split(": ")[0], ranges: r.split(": ")[1].split(" or ").map(r => ({min: parseInt(r.split("-")[0]), max: parseInt(r.split("-")[1])}))}));
const myticket = input[1].split("\n")[1].split(",").map(Number);
let others = input[2].split("nearby tickets:\n")[1].split("\n").map(t => t.split(",").map(Number));

others = others.filter(ticket => {
    for(let field of ticket) {
        if(!ranges.some(range => {
            return range.ranges.some(r => {
                return field > r.min && field < r.max;
            })
        })) return false;
    }
    return true;
})

let valids = [];

for(let fieldPos in myticket) {
    let range = ranges.filter(range => {
        return others.every(other => {
            return range.ranges.some(r => {
                return other[fieldPos] >= r.min && other[fieldPos] <= r.max;
            })
        })
    })
    valids.push(range.map(r=>r.name));
}

let legend = new Array(20).fill(null);

while(valids.some(p => p != null)) {
    let index = valids.findIndex(f => f != null && f.length == 1);
    let value = valids[index][0];
    legend[index] = value;
    valids[index] = null;
    valids = valids.map(v => {
        if(v != null) v.splice(v.indexOf(value), 1);
        return v;
    })
}

console.log(legend.reduce((ans, cur, i) => {
    if(cur.startsWith("departure")) return ans * myticket[i];
    else return ans;
}, 1));
