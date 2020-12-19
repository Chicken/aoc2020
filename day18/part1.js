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
    let inst = exp.split(" ");
    let total = parseInt(inst.shift());
    for(let i = 0; i < inst.length; i += 2) {
        if(inst[i] == "+") {
            total += parseInt(inst[i+1]);
        } else {
            total *= parseInt(inst[i+1]);
        }
    }
    return total;
}

let total = 0;

for(let exp of input) {
    total += evaluate(exp);
}

console.log(total);
