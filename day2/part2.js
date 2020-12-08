const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v=>{
    let [ policy, password ] = v.split(": ");
    policy = {
        first: parseInt(policy.split("-")[0]),
        second: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }
    return { policy, password }
})

console.log(input.reduce((valid, pw) => {
    if((pw.password[pw.policy.first-1] == pw.policy.char) ^ (pw.password[pw.policy.second-1] == pw.policy.char)) return ++valid; else return valid;
},0));