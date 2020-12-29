const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split input by empty newlines
const input = inputFile.trim().split("\n\n").map(t => {
    // split the tile by newlines
    let rows = t.split("\n");
    // take first line as its our id
    let id = rows.shift();
    // parse the number id from the line
    id = parseInt(id.substring(5,id.length-1));
    // array of edges
    let edges = [];
    // first row is north edge
    edges.push(rows[0])
    // last row is south edge
    edges.push(rows[rows.length-1])
    // first value of every row is the west edge
    edges.push(rows.map(r=>r[0]).join(""))
    // last value of each row is the east edge
    edges.push(rows.map(r=>r[r.length-1]).join(""))
    // return tile object with id and edges
    return {
        id,
        edges
    }
})

// function to find matching tiles for tile id
function findMatches(id) {
    // find the actual tile
    let tile = input.find(t => t.id == id);
    // array of matches
    let matches = [];
    // loop all the tiles
    for(let other of input) {
        // skip itself
        if(other.id == id) continue;
        // check if some of the other tiles edges
        if(other.edges.some(oedge => {
            // match some of the tiles edges
            return tile.edges.some(edge => {
                // flipped or not
                return (oedge == edge || oedge.split("").reverse().join("") == edge);
            })
        // push the tile to the array
        })) matches.push(other);
    }
    // return the array
    return matches;
}

// filter the tiles that only have two matches
// and reduce together their ids together by multiplication
console.log(input.filter(t => findMatches(t.id).length == 2).reduce((a,t) => a * t.id, 1));
