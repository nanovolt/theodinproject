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
function activateAllClear() {
    input.textContent = "";
    topOutput.textContent = "";
}
allclear.onclick = function () {
    activateAllClear();
}
function activateClear() {
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent.length == 0) {
        activateAllClear();
    }
    if (input.textContent.length == 1 && input.textContent[0] == "-") {
        activateAllClear();
    }
    observer.observe();
    let str = observer.getParsedString();
    console.log(str);
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

    input.textContent[input.textContent.length - 1];
    
    if (input.textContent[input.textContent.length - 1] == ".") {
        input.textContent += "0";
    }
    if (input.textContent) {
        topOutput.textContent = input.textContent + "=";
        
    }
    if (str.op) {
        input.textContent = calculate(str.left, str.op, str.right);
    }
    observer.observe();
    str = observer.getParsedString();
    // console.log("EQALS:", str);
    // console.log("EQALS:", str);
    // observer.setCurrentOperand();
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
    let str = observer.getParsedString();
    // console.log(str);
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
    str = observer.getParsedString();
    // console.log(str);
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
        return `x/0 is undefined`;
    }
    let result = (a / b).toFixed(2);
    if (result % 1 == 0) {
        return Math.round(result);
    }
    return result;
}

window.addEventListener("keydown", (e) => {
    // console.log(e);
    switch(e.code) {
        case "Numpad0":
            activateNumber("0");
            break;
        case "Numpad1":
            activateNumber("1");
            break;
        case "Numpad2":
            activateNumber("2");
            break;
        case "Numpad3":
            activateNumber("3");
            break;
        case "Numpad4":
            activateNumber("4");
            break;
        case "Numpad5":
            activateNumber("5");
            break;
        case "Numpad6":
            activateNumber("6");
            break;
        case "Numpad7":
            activateNumber("7");
            break;
        case "Numpad8":
            activateNumber("8");
            break;
        case "Numpad9":
            activateNumber("9");
            break;
        case "NumpadAdd":
            activateOperation("+");
            break;
        case "NumpadSubtract":
            activateOperation("-");
            break;
        case "NumpadMultiply":
            activateOperation("*");
            break;
        case "NumpadDivide":
            activateOperation("/");
            break;
        case "Backslash":
            activatePlusMinus();
            break;
        case "Backspace":
            if (e.shiftKey) {
                activateAllClear();
            } else {
                activateClear();
            }   
            break;
        case "Enter":
            activateEquals();
            break;
        case "NumpadEnter":
            activateEquals();
            break;
        case "NumpadDecimal":
            activateDot();
            break
    }
})