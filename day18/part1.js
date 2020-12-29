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
    // split by spaces
    let inst = exp.split(" ");
    // take the first number as the starting point
    let total = parseInt(inst.shift());
    // loop all the instructions
    for(let i = 0; i < inst.length; i += 2) {
        // if its a plus, add the next value to total
        if(inst[i] == "+") {
            total += parseInt(inst[i+1]);
        } else {
            // if its something else (multiplication), multiply the total with the next value 
            total *= parseInt(inst[i+1]);
        }
    }
    // return the total
    return total;
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
