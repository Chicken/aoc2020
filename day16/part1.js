const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by an empty newline
const input = inputFile.split("\n\n");

// take the ranges, map them to useful object by splitting with :'s and -'s and parsing them to integers
const ranges = input[0].split("\n").map(r => ({name: r.split(": ")[0], ranges: r.split(": ")[1].split(" or ").map(r => ({min: parseInt(r.split("-")[0]), max: parseInt(r.split("-")[1])}))}));
// take the nearby tickets and map split them by ,'s and map them to numbers
const others = input[2].split("nearby tickets:\n")[1].split("\n").map(t => t.split(",").map(Number));

// reduce together the total of values from invalid fields
// loop all tickets
console.log(others.reduce((total, ticket) => {
    // loop all fields of the ticket
    for(let field of ticket) {
        // test that if none of the ranges match the field
        if(!ranges.some(range => {
            // each range has two possibilities so we loop them too
            return range.ranges.some(r => {
                // and test if the value is inside the range
                return field >= r.min && field <= r.max;
            })
        // its invalid and add it to the total
        })) total += field;
    }
    // return the total
    return total;
}, 0));
