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

const allclear = document.querySelector(".allclear");
const clear = document.querySelector(".clear");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const dot = document.querySelector(".dot");
const equals = document.querySelector(".equals");

let lastEntry;
let topValue = "";
let pressedOperation = false;
let enableDecimal = true;

function showOnTop(str) {
    topOutput.textContent = str;
}
function updateLastEntry () {
    lastEntry = input.textContent[input.textContent.length - 1];
}
function calculate(a, operation, b) {
    switch(operation) {
        case "+" :
            add(a, b);
            break;
        case "-" :
            subtract(a, b);
            break;
        case "*" :
            muliply(a, b);
            break;
        case "/" :
            operate(a, b);
            break;
    }
}
function parseString(str) {

    let signs = /\+|\-|\*|\//;

    match = signs.exec(str);
    if (match !== null) {
        console.log("match:", match.index);
        console.log("string:", str);
        console.log(input.textContent.split(/\+|\-|\*|\//));
    }
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
allclear.onclick = function() {
    input.textContent = "";
    topOutput.textContent = "";
   
}
clear.onclick = function() {
    input.textContent = input.textContent.slice(0, -1);
}

dot.onclick = function() {
    if (enableDecimal) {
        console.log("lastEntry:", lastEntry);
        console.log("typeof lastEntry:", typeof +lastEntry);
        if(true) {

        }
        
        enableDecimal = false;
    }
}
equals.onclick = function() {
    
    topOutput.textContent = input.textContent + "=";
    updateLastEntry();
    showOnTop(topOutput.textContent);
    input.textContent = parseString(topOutput.textContent);
}
for (let number of numbers) {
    number.addEventListener("click", ()=> {   
        input.textContent += number.textContent; 
        updateLastEntry();
    })
}

for (let operation of operations) {
    operation.addEventListener("click", ()=> {
        if (!pressedOperation && !operation.classList.contains("noshow")) {
            input.textContent += operation.textContent;
            pressedOperation = true;
            enableDecimal = true;
        }
        if (pressedOperation) {

        }
        updateLastEntry();
    })
}