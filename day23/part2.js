const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });

let input = inputFile.split("").map(Number);

for (let i = input.length + 1; i <= 1000000; i++) input.push(i);
input = input.map(value => ({ value }));
input.forEach((_, i) => i == input.length - 1 ? input[i].next = input[0] : input[i].next = input[i + 1]);

let map = new Map();
input.forEach(v => map.set(v.value, v));
let head = input[0];

for (let i = 0; i < 10000000; i++) {
    let picked = [ head.next.value, head.next.next.value, head.next.next.next.value ];
    let pickedHead = head.next;
    head.next = head.next.next.next.next;

    let ptr = head.value - 1;
    while (picked.includes(ptr)) ptr--;
    if(ptr < 1) ptr += input.length;

    let pos = map.get(ptr);
    pickedHead.next.next.next = pos.next;
    pos.next = pickedHead;
    head = head.next;
}

let one = map.get(1);
console.log(one.next.value * one.next.next.value);
