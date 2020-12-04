const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v=>{
    let [ policy, password ] = v.split(": ");
    policy = {
        min: parseInt(policy.split("-")[0]),
        max: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }
    return {
        policy,
        password
    }
})

let valid = 0;

for(let pw of input) {
    let count = (pw.password.match(new RegExp(pw.policy.char, "g")) || []).length
    if(count <= pw.policy.max && count >= pw.policy.min) valid++;
}

console.log(valid);