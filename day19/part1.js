const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n")
const rules = Object.fromEntries(input[0].split("\n").map(r => r.split(":").map(s=>s.trim())));
const messages = input[1].trim();

function generateRegex(rule) {
    let str = "";
    if(rule.indexOf("|") != -1) {
        let subs = rule.split(" | ");
        str += `(${generateRegex(subs[0])}|${generateRegex(subs[1])})`;
    } else if (!rule.startsWith("\"")) {
        let subs = rule.split(" ");
        for(let sub of subs) str += generateRegex(rules[sub]);
    } else {
        str += rule.substring(1,2);
    }
    return str;
}

let reg = new RegExp("^" + generateRegex("0") + "$", "gmi");

console.log(messages.match(reg).length)
