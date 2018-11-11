require('./scripts/second.js')
console.log('Hello World from index js script');
console.log('Hello World again');

let Func = (a, b = 10) => {
 return a + b; 
}
let displayresult = Func(20); // 20 + 10 = 30

console.log(displayresult);