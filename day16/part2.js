const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by an empty newline
const input = inputFile.split("\n\n");

// take the ranges, map them to useful object by splitting with :'s and -'s and parsing them to integers
const ranges = input[0].split("\n").map(r => ({name: r.split(": ")[0], ranges: r.split(": ")[1].split(" or ").map(r => ({min: parseInt(r.split("-")[0]), max: parseInt(r.split("-")[1])}))}));
// this time we need the myticket variable, we split and map it like the nearby tickets
const myticket = input[1].split("\n")[1].split(",").map(Number);
// take the nearby tickets and map split them by ,'s and map them to numbers
let others = input[2].split("nearby tickets:\n")[1].split("\n").map(t => t.split(",").map(Number));

// filter out the invalid tickets using the same loops as part 1
others = others.filter(ticket => {
    // loop all fields
    for(let field of ticket) {
        // test if none is valid
        if(!ranges.some(range => {
            // one range has two possibilities so loop those
            return range.ranges.some(r => {
                // test if inside inside range
                return field > r.min && field < r.max;
            })
        // return false if invalid
        })) return false;
    }
    // otherwise return true
    return true;
})

// array of possible ranges for each field in myticket
let valids = [];

// loop all positions of myticket
for(let fieldPos in myticket) {
    // filter out ranges that fit the value
    let range = ranges.filter(range => {
        // test if this range fits all the tickets in the same position
        return others.every(other => {
            // and yet again test if one of the two possibilities is correct
            return range.ranges.some(r => {
                // test if inside inside range
                return other[fieldPos] >= r.min && other[fieldPos] <= r.max;
            })
        })
    })
    // push the names of valid ranges to the array
    valids.push(range.map(r=>r.name));
}

// create array that will hold the valid names for each field
let legend = new Array(20).fill(null);

// loop until all valid possibilities are used
while(valids.some(p => p != null)) {
    // find field index with only one possibility
    let index = valids.findIndex(f => f != null && f.length == 1);
    // take its value
    let value = valids[index][0];
    // set the legend at the index with the value
    legend[index] = value;
    // set the valid value to null so we dont reuse it
    valids[index] = null;
    // remove the value from all other valid values
    valids = valids.map(v => {
        // if its not null, splice one element off at the index of the value
        if(v != null) v.splice(v.indexOf(value), 1);
        return v;
    })
}

// log the reduced answer, loop the legend
console.log(legend.reduce((ans, cur, i) => {
    // if the name starts with departure, return the ans times the value at of myticket at the index
    if(cur.startsWith("departure")) return ans * myticket[i];
    // or just return the current ans
    else return ans;
}, 1));
