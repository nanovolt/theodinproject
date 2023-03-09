function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function muliply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

const topOutput = document.querySelector(".top");
topOutput.textContent = "";
const input = document.querySelector(".input");
input.textContent = "";

const plusminus = document.querySelector(".plusminus");
const allclear = document.querySelector(".allclear");
const clear = document.querySelector(".clear");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const dot = document.querySelector(".dot");
const equals = document.querySelector(".equals");

let lastEntry = "";
let topValue = "";
let pressedOperation = false;
let enableDecimal = true;
let isFull = false;

function showOnTop(str) {
    topOutput.textContent = str;
}
function updateLastEntry () {
    lastEntry = input.textContent[input.textContent.length - 1];
}
function calculate(a, operation, b) {
    switch(operation) {
        case "+" :
            return add(a, b);
            break;
        case "-" :
            return subtract(a, b);
            break;
        case "*" :
            return muliply(a, b);
            break;
        case "/" :
            return divide(a, b);
            break;
    }
}
function parseString() {

    let signs = /\+|\-|\*|\//g;

    // let str = "-1";
    
    // let str = "1+2";
    // let str = "1-2";

    // let str = "-1+2";
    // let str = "1+-2";
    // let str = "1--2";

    // let str = "-1+-2";
    let str = "-1--2";

    let parsedString = {};
    let matches = [...str.matchAll(signs)];
    // console.log("matches:", matches);

    function split_at_index(str, index)
    {
        let left = str.substring(0, index);
        let op = str.substring(index, index+1);
        let right = str.substring(index+1);
        return [left, op, right];
        // return value.substring(0, index) + "," + value.substring(index);
    }

    // for (let match of matches) {
    //     console.log(match);
    // }

    if (matches.length == 1 && matches[0].index != 0) {
        let splitString = split_at_index(str, matches[0].index);
        console.log("splitString:", splitString);
        return splitString;
    }
    if (matches.length == 3 || matches.length == 2 && matches[0].index == 0) {
        let splitString = split_at_index(str, matches[1].index);
        console.log("splitString:", splitString);
        return splitString;
    }
    if (matches.length == 2 && matches[0].index != 0) {
        let splitString = split_at_index(str, matches[0].index);
        console.log("splitString:", splitString);
        return splitString;
    }
    return [str];
        // let operandArr = input.textContent.split(/\+|\-|\*|\//);
        // console.log("operandArr:", operandArr);
        // let operation = input.textContent[match.index];

        // return parsedString;
    // }
    // parsedString = {"left": input.textContent, "op": "", "right": ""};
    // console.log("parsed string:", parsedString);
    // return parsedString;

    // console.log(+input.textContent);

    // console.log(input.textContent.split(/\+|\-|\*|\//));

    // let pattern = /\+|\-|\*|\//g;
    // let signs = /\+|\-|\*|\//;
    // let arr = [];
    // let leftOperand = [];
    // let rightOperand = [];
    // let restOfTheString = [];
    // let addRest = false;
    
    // match = pattern.exec(input.textContent);

    // if (match !== null) {
    //     console.log("match:", match.index);
    //     console.log("string:", input.textContent);
    //     for (let i = match.index-1; i >= 0; i--) {
    //         leftOperand.unshift(input.textContent[i]);
    //     }
    //     for (let i = match.index+1; i < input.textContent.length; i++) {
    //         if (i < input.textContent.length) {
    //             rightOperand.unshift(input.textContent[i]);
    //         }
    //     }
    //     let lo = leftOperand.join("");
    //     arr.push({"operand":lo, "operation": input.textContent[match.index]});
    //     console.log("arr:", arr);
    // }
}

plusminus.onclick = function() {
    let parsedString = parseString();

    // console.log(parsedString);
    if (parsedString.right != "") {
        console.log('right not empty');
        parsedString.right = String(0 - +parsedString.right);
        console.log("PARSED:", parsedString);
        input.textContent = parsedString.left+parsedString.op+parsedString.right;
        parseString();
        return
    }

    if (parsedString.left != "") {
        console.log('left not empty');
        parsedString.left = String(0 - +parsedString.left);
        console.log("PARSED:", parsedString);
        input.textContent = parsedString.left+parsedString.op+parsedString.right;
        parseString();
        return
    }
    
    // console.log(parsedString);
    // input.textContent = parsedString.left+parsedString.op+parsedString.right;

    // let signs = /\+|\-|\*|\//;
    // // console.log(input.textContent[input.textContent.length-1]);
    // match = signs.exec(input.textContent);
    // console.log("match:", match);
    // if (match) {
    //     console.log("match.index:", match.index);
    //     let num = +input.textContent.slice(match.index+1);
    //     let sub = input.textContent.substring(0, match.index+1);
    //     num = 0 - num;
    //     console.log("num:", num);
    //     console.log("sub:", sub);
    //     input.textContent = sub + String(num);
    // } else {
    //     input.textContent = 0 - +input.textContent;
    // }

    // for (let i = input.textContent.length-1; i >= 0; i--) {
    //     console.log(input.textContent[i]);
        
    // }
    
    // if (match !== null) {
    //     match.index;
    // while(true) {

    // }
    // }
    
}
    

allclear.onclick = function() {
    input.textContent = "";
    topOutput.textContent = "";
    lastEntry = "";
    pressedOperation = false;
    enableDecimal = true;
}
clear.onclick = function() {
    input.textContent = input.textContent.slice(0, -1);
    parseString();
    if (input.textContent.length == 0) {
        allclear.onclick();
    }

}

dot.onclick = function() {
    if (enableDecimal) {
        console.log("lastEntry:", lastEntry);
        let numbers = /\d/;
        console.log(lastEntry.match(numbers));
        if(lastEntry.match(numbers)) {
            input.textContent += ".";
        } else {
            input.textContent += "0.";
        }
        enableDecimal = false;
    }
    updateLastEntry();
}
equals.onclick = function() {
    if (lastEntry == ".") {
        input.textContent += "0";
    }
    topOutput.textContent = input.textContent + "=";
    updateLastEntry();
    showOnTop(topOutput.textContent);
    let parsedString = parseString();
}

for (let number of numbers) {
    number.addEventListener("click", ()=> {   
        input.textContent += number.textContent; 
        updateLastEntry();
        parseString();
    })
}

for (let operation of operations) {
    operation.addEventListener("click", ()=> {
        if (lastEntry == ".") {
            input.textContent += "0";
        }
        if (!pressedOperation && !operation.classList.contains("noshow")) {
            input.textContent += operation.textContent;
            pressedOperation = true;
            enableDecimal = true;
        }
        parseString();
        updateLastEntry();
    })
}