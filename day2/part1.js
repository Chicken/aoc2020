const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v=>{
    let [ policy, password ] = v.split(": ");
    return { policy: {
        min: parseInt(policy.split("-")[0]),
        max: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }, password }
})

console.log(input.reduce((valid, pw) => {
    let count = (pw.password.match(new RegExp(pw.policy.char, "g")) || []).length
    if(count <= pw.policy.max && count >= pw.policy.min) return ++valid; else return valid;
},0));