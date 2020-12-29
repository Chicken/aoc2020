const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split all the expressions by newline
const input = inputFile.split("\n");

// function to evaluate expressions
function evaluate(exp) {
    // while the expression still has parenthesis
    while(exp.indexOf("(") != -1) {
        // replace them with the value they evaluate to
        exp = exp.replace(/\([\d+* ]+\)/, e => evaluate(e.substring(1, e.length - 1)));
    }
    // while the expression still has addition
    while(exp.indexOf("+") != -1){
        // replace them with their value by evaling them
        exp = exp.replace(/\d+ \+ \d+/, eval);
    }
    // while the expression still has multiplication
    while(exp.indexOf("*") != -1){
        // replace them with their value by evaling them
        exp = exp.replace(/\d+ \* \d+/, eval);
    }
    // return the answer by parsing the leftover expression to int
    return parseInt(exp);
}

// keep count of the answer total
let total = 0;

// loop all the expressions
for(let exp of input) {
    // and add their answer to total
    total += evaluate(exp);
}

// log the answer
console.log(total);
