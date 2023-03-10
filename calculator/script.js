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
        this.setCurrentOperand();
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
        
        // console.log(`parsedString: ${this.parsedString}`);

        this.setCurrentOperand();

    }
    setCurrentOperand() {
        this.parsedString.op == ""
        ? this.currentOperand = "left"
        : this.currentOperand = "right";
    }
    getCurrentOperand() {
        return this.currentOperand;
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
    let str = observer.getParsedString();

    switch(observer.getCurrentOperand()) {
        case "left" :
            if (str.left && +str.left != 0) {
                str.left = String(0 - +str.left);
                input.textContent = str.left + str.op + str.right;
            }
            break;

        case "right":
            if (str.right && +str.right != 0) {
                str.right = String(0 - +str.right);
                input.textContent = str.left + str.op + str.right;
            }
            break;
    }
    observer.observe();
    str = observer.getParsedString();
    console.log(str);
}
    
allclear.onclick = function() {
    input.textContent = "";
    topOutput.textContent = "";
}
clear.onclick = function() {
    
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent.length == 0) {
        allclear.onclick();
    }

    observer.observe();
    let str = observer.getParsedString();
    console.log(str);
}

dot.onclick = function() {

    let str = observer.getParsedString();
    switch(observer.getCurrentOperand()) {
        case "left":
            console.log("left");
            if (!str.left.includes(".")) {
                if (str.left == "") {
                    str.left += "0.";
                } else {
                    str.left += ".";
                }
                input.textContent = str.left + str.op + str.right;
            }
            break;
        case "right":
            console.log("right");
            if (!str.right.includes(".")) {
                if (str.right == "") {
                    str.right += "0.";
                } else {
                    str.right += ".";
                }
                input.textContent = str.left + str.op + str.right;          
            }
            break;
    }    
}
equals.onclick = function() {
    let str = observer.getParsedString();
    topOutput.textContent = input.textContent + "=";
    input.textContent = calculate(+str.left, str.op, +str.right);
}

for (let number of numbers) {
    number.addEventListener("click", ()=> {   
        input.textContent += number.textContent;

        observer.observe();
        let str = observer.getParsedString();
        console.log(str);
    })
}

for (let operation of operations) {
    
    operation.addEventListener("click", ()=> {
        let str = observer.getParsedString();
        if (str.op) {
            equals.onclick();
        }
        
        input.textContent += operation.textContent;

        observer.observe();
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