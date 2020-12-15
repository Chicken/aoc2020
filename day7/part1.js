const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input by newlines
const input = inputFile.split("\n").map(v => {
    // split the bag and what is contains
    let [ bag, content ] = v.split(" contain ");
    // we only care about the color and now we dont have to worry about plurals
    bag = bag.split(" ");
    bag.pop();
    bag = bag.join(" ");
    // split the contents by ,
    let contents = content.split(", ").map(b => {
        // dont care about bags that dont have contents
        if(b == "no other bags.") return;
        // take the amount and type by splitting by space
        let [ amount, ...type ] = b.split(" ");
        // turn amount into a number
        amount = parseInt(amount);
        // yet again we dont care about the bag(s) word
        type.pop();
        type = type.join(" ");
        return { type, amount };
        // filter out empty contents
    }).filter(_=>_);
    // return object with the data
    return {type: bag, contents};
})

// make a set that can only contain unique items
let out = new Set();

let search = type => {
    // filter input for every bag that can contain
    // the type we are searching for
    let next = input.filter(b => {
        return b.contents.some(e => {
            return e.type == type;
        })
    })
    // loop the bags, add them to the set if not already there
    // and search on for bags that contain that bag
    for(let bag of next) {
        out.add(bag.type);
        search(bag.type);
    }
}

// search for the shiny gold bag
search("shiny gold")
// print the size of unique out layers
console.log(out.size)
