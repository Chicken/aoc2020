const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newline and loop every value
const input = inputFile.split("\n").map(v=>{
    // split the line by : to get the police and the password
    let [ policy, password ] = v.split(": ");
    // split the policy into pieces and return an object
    // with all the necessary data (mix, max and the char)
    return { policy: {
        min: parseInt(policy.split("-")[0]),
        max: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }, password }
})

// log the output of counting valid passwords in the array
console.log(input.reduce((valid, pw) => {
    // get the count policy char in the password by using regex
    let count = (pw.password.match(new RegExp(pw.policy.char, "g")) || []).length
    // and return an increased value if its in range of the police and non increased one if not
    if(count <= pw.policy.max && count >= pw.policy.min) return ++valid; else return valid;
},0));
