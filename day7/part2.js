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

let count = type => {
    // find the bag
    let bag = input.find(e => e.type == type);
    // start count of total amount
    let amount = 0;
    // loop all the contents of the bag
    for(let next of bag.contents) {
        // the amount of bag in it
        // + the amount of bag in those bags
        // multiplied their count
        amount += next.amount + (next.amount * count(next.type));
    }
    // return total amount
    return amount;
}

// count shiny golds contents
console.log(count("shiny gold"))
