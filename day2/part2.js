const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newline and loop every value
const input = inputFile.split("\n").map(v=>{
    // split the line by : to get the police and the password
    let [ policy, password ] = v.split(": ");
    // split the policy into pieces and return an object
    // with all the necessary data (first index, second index and the char)
    return { policy: {
        first: parseInt(policy.split("-")[0]),
        second: parseInt(policy.split("-")[1].split(" ")[0]),
        char: policy.split("-")[1].split(" ")[1]
    }, password }
})


// log the output of counting valid passwords in the array
console.log(input.reduce((valid, pw) => {
    // check that only of the indexes has the policy char by using xor operator
    // and return increased count if true and not increased if false
    if((pw.password[pw.policy.first-1] == pw.policy.char) ^ (pw.password[pw.policy.second-1] == pw.policy.char)) return ++valid; else return valid;
},0));
