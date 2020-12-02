const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// parse input
const input = inputFile.split("\n").map(v=>{
    let [ policy, password ] = v.split(": ");
    policy = {
        first: parseInt(policy.split("-")[0]),
        second: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }
    return {
        policy,
        password
    }
})

let valid = 0;

for(let pw of input) {
    if(((pw.password[pw.policy.first-1] == pw.policy.char) && (pw.password[pw.policy.second-1] != pw.policy.char))
    || ((pw.password[pw.policy.first-1] != pw.policy.char) && (pw.password[pw.policy.second-1] == pw.policy.char))) {
        valid++;
    }
}

console.log(valid);