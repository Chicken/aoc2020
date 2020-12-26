const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n")
const rules = Object.fromEntries(input[0].split("\n").map(r => r.split(":").map(s=>s.trim())));
const messages = input[1].trim();

rules["8"] = "42 | 42 8";
rules["11"] = "42 31 | 42 11 31"

function generateRegex(rule, recur) {
    // this is the stupidest way of doing this 
    // but it works :D
    if(recur > 50) return "a";
    let str = "";
    if(rule.indexOf("|") != -1) {
        let subs = rule.split(" | ");
        str += `(${generateRegex(subs[0], recur + 1)}|${generateRegex(subs[1], recur + 1)})`;
    } else if (!rule.startsWith("\"")) {
        let subs = rule.split(" ");
        for(let sub of subs) str += generateRegex(rules[sub], recur + 1);
    } else {
        str += rule.substring(1,2);
    }
    return str;
}

let reg = new RegExp("^" + generateRegex("0", 0) + "$", "gmi");

console.log(messages.match(reg).length)
