const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by the empty newline
const input = inputFile.split("\n\n")
// generate a rules object by making an array of entries by mapping and splitting and doing magic to the string
const rules = Object.fromEntries(input[0].split("\n").map(r => r.split(":").map(s => s.trim())));
// take the second part as messages
const messages = input[1].trim();

// function to generate rule regex string from rule
function generateRegex(rule) {
    // initialize the string
    let str = "";
    // if the rule is actually multiple possible rules
    if(rule.indexOf("|") != -1) {
        // split by |
        let subs = rule.split(" | ");
        // and add a capture group of both rules seperated by an "or" operator
        str += `(${generateRegex(subs[0])}|${generateRegex(subs[1])})`;
    // if the rule is not a string literal (doesnt starts with ")
    } else if (!rule.startsWith("\"")) {
        // split by space to take all multiple rules
        let subs = rule.split(" ");
        // loop rules and add them to the string
        for(let sub of subs) str += generateRegex(rules[sub]);
    // and else (it is a string literal)
    } else {
        // take the char from quotes and just add it to the string
        str += rule.substring(1,2);
    }
    // return the string
    return str;
}

// turn the generated string into an actual regex and adding multiline, global and case insensitive flags to it
let reg = new RegExp("^" + generateRegex("0") + "$", "gmi");

// match all valid strings and log the amount of them
console.log(messages.match(reg).length)
