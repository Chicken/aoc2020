const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.trim().split("\n\n").map(t => {
    let rows = t.split("\n");
    let id = rows.shift();
    id = parseInt(id.substring(5,id.length-1));
    let edges = [];
    edges.push(rows[0])
    edges.push(rows[rows.length-1])
    edges.push(rows.map(r=>r[0]).join(""))
    edges.push(rows.map(r=>r[r.length-1]).join(""))
    return {
        id,
        edges
    }
})

function findMatches(id) {
    let tile = input.find(t => t.id == id);
    let matches = [];
    for(let other of input) {
        if(other.id == id) continue;
        if(other.edges.some(oedge => {
            return tile.edges.some(edge => {
                return (oedge == edge || oedge.split("").reverse().join("") == edge)
            })
        })) {
            matches.push(other)
        }
    }
    return matches;
}

console.log(input.filter(t => findMatches(t.id).length == 2).reduce((a,t)=>a*t.id,1))
