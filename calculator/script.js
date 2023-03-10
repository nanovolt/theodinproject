

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

class stateObserver {

    constructor() {
        this.inputString = input.textContent;
        this.parsedString = this.parseString();
        this.isDecimalEnabled = true;
    }
    getInputString() {
        return this.inputString;
    }
    getParsedString() {
        return this.parseString();
    }
    observe() {
        this.inputString = input.textContent;
        this.parsedString = this.parseString();
    }
    
    parseString() {

        let signs = /\+|\-|\*|\//g;
    
        // let str = "-1";
        
        // let str = "1+2";
        // let str = "1-2";
    
        // let str = "-1+2";
        // let str = "1+-2";
        // let str = "1--2";
    
        // let str = "-1+-2";
        // let str = "-1--2";
    
        let str = input.textContent;
        let parsedString = {};
        let matches = [...str.matchAll(signs)];
        // console.log("matches:", matches);
    
        // for (let match of matches) {
        //     console.log(match);
        // }
    
        function split_at_index(str, index)
        {
            let left = str.substring(0, index);
            let op = str.substring(index, index+1);
            let right = str.substring(index+1);
            return [left, op, right];
        }
    
        if (matches.length == 1 && matches[0].index != 0) {
            let splitString = split_at_index(str, matches[0].index);
       
            parsedString.left = splitString[0];
            parsedString.op = splitString[1];
            parsedString.right = splitString[2];
    
            // console.log("parsedString:", parsedString);
    
            return parsedString;
        }
        if (matches.length == 3 || matches.length == 2 && matches[0].index == 0) {
            let splitString = split_at_index(str, matches[1].index);
         
            parsedString.left = splitString[0];
            parsedString.op = splitString[1];
            parsedString.right = splitString[2];
            
            // console.log("parsedString:", parsedString);
    
            return parsedString;
        }
        if (matches.length == 2 && matches[0].index != 0) {
            let splitString = split_at_index(str, matches[0].index);
            
            parsedString.left = splitString[0];
            parsedString.op = splitString[1];
            parsedString.right = splitString[2];
            
            // console.log("parsedString:", parsedString);
    
            return parsedString;
        }
        
        parsedString.left = str;
        parsedString.op = "";
        parsedString.right = "";
    
        return parsedString;
    }
}

let observer = new stateObserver();

plusminus.onclick = function() {
    observer.observe();
    let parsedString = observer.getParsedString();

    console.log(parsedString);

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
}
    
allclear.onclick = function() {
    input.textContent = "";
    topOutput.textContent = "";
}
clear.onclick = function() {
    input.textContent = input.textContent.slice(0, -1);
    parseString();
    if (input.textContent.length == 0) {
        allclear.onclick();
    }
}

dot.onclick = function() {
    input.textContent += ".";
}
equals.onclick = function() {
    topOutput.textContent = input.textContent + "=";
}

for (let number of numbers) {
    number.addEventListener("click", ()=> {   
        input.textContent += number.textContent; 
    })
}

for (let operation of operations) {
    operation.addEventListener("click", ()=> {
        input.textContent += operation.textContent;
    })
}

function calculate(a, operation, b) {
    switch(operation) {
        case "+" :
            return add(a, b);
        case "-" :
            return subtract(a, b);
        case "*" :
            return muliply(a, b);
        case "/" :
            return divide(a, b);
    }
}
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