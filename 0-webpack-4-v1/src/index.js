// we dont use {style} bcoz css code is exported as default and available as style in import statement
// for default export import, we do not need curly brackets
// so css file is exported as default and is imported here as style and not {style}

// import style from './index.css';

// u can import one css file via style so we wont use that, we will use require
require('./index.css');
require('./index.scss');

import { add } from './one';

console.log('hello from index.js');
console.log( "sum:" + add(2,3) + " and hello from one.js - this function from file was exported and imported");

require('./require-two.js');

// es6
let NewOneWithParameters = (a, b) => {
    console.log("es6 - 20 plus 10 is equals to "+ (a+b)); // 30
}
NewOneWithParameters(10, 20);