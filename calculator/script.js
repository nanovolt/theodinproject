const topOutput = document.querySelector(".top");
topOutput.textContent = "";
const input = document.querySelector(".input");
input.textContent = "";

const plusminus = document.querySelector(".plusminus");
const percent = document.querySelector(".percent");
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

        function split_at_index(str, index) {
            let left = str.substring(0, index);
            let op = str.substring(index, index + 1);
            let right = str.substring(index + 1);
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

function activatePlusMinus() {
    
    observer.observe();
    let str = observer.getParsedString();

    switch (observer.getCurrentOperand()) {
        case "left":
            if (str.left && +str.left != 0 && !isNaN(str.left)) {
                str.left = String(0 - +str.left);
                input.textContent = str.left + str.op + str.right;
            }
            break;

        case "right":
            if (str.right && +str.right != 0 && !isNaN(str.right)) {
                str.right = String(0 - +str.right);
                input.textContent = str.left + str.op + str.right;
            }
            break;
    }
    observer.observe();
    str = observer.getParsedString();
    console.log(str);
}
plusminus.onclick = function () {
    activatePlusMinus();
}
function activatePercent() {
    
    observer.observe();
    let str = observer.getParsedString();

    switch (observer.getCurrentOperand()) {
        case "left":
            if (str.left && +str.left != 0 && !isNaN(str.left)) {

                str.left = +str.left / 100;

                input.textContent = str.left + str.op + str.right;
            }
            break;

        case "right":
            if (str.right && +str.right != 0 && !isNaN(str.right)) {
                
                str.right = +str.right / 100;

                input.textContent = str.left + str.op + str.right;
            }
            break;
    }
    observer.observe();
    str = observer.getParsedString();
    console.log(str);
}
percent.onclick = function() {
    activatePercent();
}

function activateAllClear() {
    input.textContent = "";
    topOutput.textContent = "";
    observer.observe();
    // console.log("AC:", observer.getParsedString());
    // console.log("AC:", observer.getInputString());
    // console.log("AC:", observer.getCurrentOperand());
}

allclear.onclick = function () {
    activateAllClear();
}

// allclear.addEventListener("click", callAllClear);

// function callAllClear(e) {
//     console.log("CALL at 194:", allclear);
//     console.log("CALL at 194 e:", e);
    
// }
function activateClear() {
    if (input.textContent == "undefined") {
        activateAllClear();
    }
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent.length == 0) {
        activateAllClear();
    }
    if (input.textContent.length == 1 && input.textContent[0] == "-") {
        activateAllClear();
    }
    observer.observe();
    let str = observer.getParsedString();
    // console.log(str);
}
clear.onclick = function () {
    activateClear();
}

function activateDot() {
    let str = observer.getParsedString();
    // console.log("DOT:", observer.getCurrentOperand());
    switch (observer.getCurrentOperand()) {
        case "left":
            
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
dot.onclick = function () {
    activateDot();
}
function activateEquals() {
    let str = observer.getParsedString();
    let signs = /\+|\-|\*|\//g;

    let lastInput = input.textContent[input.textContent.length - 1];
    
    if (lastInput == ".") {
        input.textContent += "0";
    }
    if (str.left != "" && str.right == "") {
        topOutput.textContent = str.left + "=";
    } else {
        topOutput.textContent = input.textContent + "=";
    }
    // if (input.textContent) {
    //     topOutput.textContent = input.textContent + "="; 
    // }
    if (str.op) {
        input.textContent = calculate(str.left, str.op, str.right);
    }
    
    observer.observe();
}
equals.onclick = function () {
    activateEquals();
}
function activateNumber(number) {
    if(typeof number == "string") {
        input.textContent += number;
    } 
    else {
        input.textContent += number.textContent;
    }
    observer.observe();
}
for (let number of numbers) {
    number.addEventListener("click", () => {
        activateNumber(number);
    })
}
function activateOperation(operation) {
    let str = observer.getParsedString();

    if (input.textContent[input.textContent.length - 1] == ".") {
        input.textContent += "0";
    }

    if (str.left != "") {
        if (str.op == "") {
            if (typeof operation == "string") {
                input.textContent += operation;
            } else{
                input.textContent += operation.textContent;
            }
        }
    }
    if (str.right != "") {
        equals.onclick();
        if (typeof operation == "string") {
            input.textContent += operation;
        } else{
            input.textContent += operation.textContent;
        }
    }
    if (str.right == "" && str.op != "") {
        if (typeof operation == "string") {
            input.textContent = str.left + operation + str.right;
        } else{
            input.textContent = str.left + operation.textContent + str.right;
        }   
    }
    observer.observe();
}
for (let operation of operations) {
    operation.addEventListener("click", () => {
        activateOperation(operation);
    })
}

function calculate(a, operation, b) {
    if (b == "") {
        return +a;
    }
    console.log(`a: ${a}, b: ${b}`);
    switch (operation) {
        case "+":
            return add(+a, +b);
        case "-":
            return subtract(+a, +b);
        case "*":
            return muliply(+a, +b);
        case "/":
            return divide(+a, +b);
    }
}
function add(a, b) {
    
    let result = (a + b).toFixed(2);
    if (result % 1 == 0) {
        return Math.round(result);
    }
    return result;
}
function subtract(a, b) {
    let result = (a - b).toFixed(2);
    if (result % 1 == 0) {
        return Math.round(result);
    }
    return result;
}
function muliply(a, b) {
    let result = (a * b).toFixed(2);
    if (result % 1 == 0) {
        return Math.round(result);
    }
    return result;
}
function divide(a, b) {
    if (b == 0) {
        return `undefined`;
    }
    let result = (a / b).toFixed(2);
    if (result % 1 == 0) {
        return Math.round(result);
    }
    return result;
}
function activateClickEffect(e) {

    // e.target.style.cssText = "color: greenyellow;\
    // background-color:#60b610ee;\
    // cursor: pointer;\
    // outline: 1px solid greenyellow;"
}
window.addEventListener("keydown", (e) => {
    console.log(e);
    
    // e.preventDefault();
    // prevets NumpadEnter from triggering click event
    // Or you'll be entering the last mouseclicked item
    activateClickEffect(e);
    
    switch(e.code) {
        
        case "Numpad0":
            activateNumber("0");
            e.preventDefault();
            break;
        case "Numpad1":
            activateNumber("1");
            e.preventDefault();
            break;
        case "Numpad2":
            activateNumber("2");
            e.preventDefault();
            break;
        case "Numpad3":
            activateNumber("3");
            e.preventDefault();
            break;
        case "Numpad4":
            activateNumber("4");
            e.preventDefault();
            break;
        case "Numpad5":
            activateNumber("5");
            e.preventDefault();
            break;
        case "Numpad6":
            activateNumber("6");
            e.preventDefault();
            break;
        case "Numpad7":
            activateNumber("7");
            e.preventDefault();
            break;
        case "Numpad8":
            activateNumber("8");
            e.preventDefault();
            break;
        case "Numpad9":
            activateNumber("9");
            e.preventDefault();
            break;
        case "NumpadAdd":
            activateOperation("+");
            e.preventDefault();
            break;
        case "NumpadSubtract":
            activateOperation("-");
            e.preventDefault();
            break;
        case "NumpadMultiply":
            activateOperation("*");
            e.preventDefault();
            break;
        case "NumpadDivide":
            activateOperation("/");
            e.preventDefault();
            break;
        case "Backslash":
            activatePlusMinus();
            e.preventDefault();
            break;
        case "Digit5":
            if (e.shiftKey) {
                activatePercent();
                e.preventDefault();
            }
            break;
        case "ShiftRight":
            activatePercent();
            e.preventDefault();
            break;
        case "Backspace":
            if (e.shiftKey) {
                activateAllClear();
                e.preventDefault();
            } else {
                activateClear();
                e.preventDefault();
            }   
            break;
        case "Enter":
            activateEquals();
            e.preventDefault();
            break;
        case "NumpadEnter":
            activateEquals();
            e.preventDefault();
            break;
        case "NumpadDecimal":
            activateDot();
            e.preventDefault();
            break
    }
})