const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => {
    let [ bag, content ] = v.split(" contain ");
    bag = bag.split(" ");
    bag.pop();
    bag = bag.join(" ");
    let contents = content.split(", ").map(b => {
        if(b == "no other bags.") return;
        let [ amount, ...type ] = b.split(" ");
        amount = parseInt(amount);
        type.pop();
        type = type.join(" ");
        return { type, amount };
    }).filter(_=>_);
    return {type: bag, contents};
})

let count = type => {
    let bag = input.find(e => e.type == type);
    let amount = 0;
    for(let next of bag.contents) {
        amount += next.amount + (next.amount * count(next.type));
    }
    return amount;
}

console.log(count("shiny gold"))