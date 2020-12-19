const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n");

function getBrackets(text) {
    let end = text.lastIndexOf(')');
    let i = end - 1;
    let nesting = 1;
    while (nesting > 0) {
        let c = text.charAt(i);
        if (c === ')') nesting++;
        if (c === '(') nesting--;
        i--;
    }

    return text.substring(i + 2, end);
}

function evaluate(exp) {
    while(exp.indexOf("(") != -1) {
        let brackets = getBrackets(exp);
        exp = exp.replace("(" + brackets + ")", evaluate(brackets));
    }
    while(exp.indexOf("+") != -1){
        exp = exp.replace(/\d+ \+ \d+/, add => {
            return eval(add);
        })
    }
    while(exp.indexOf("*") != -1){
        exp = exp.replace(/\d+ \* \d+/, mul => {
            return eval(mul);
        })
    }
    return parseInt(exp);
}

let total = 0;

for(let exp of input) {
    total += evaluate(exp);
}

console.log(total);
