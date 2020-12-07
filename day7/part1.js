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

let out = new Set();

let search = type => {
    let next = input.filter(b => {
        return b.contents.some(e => {
            return e.type == type;
        })
    })
    for(let bag of next) {
        out.add(bag.type);
        search(bag.type);
    }
}

search("shiny gold")
console.log(out.size)