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

function operate(operator) {
    switch(operator) {
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

const output = document.querySelector(".output");
output.textContent = "";

const allclear = document.querySelector(".allclear");
allclear.onclick = function () {
    output.textContent = "";
}
const numbers = document.querySelectorAll(".number");
for (let number of numbers) {
    number.addEventListener("click", ()=> {
        if (number.textContent == ".") {
            let lastInput = output.textContent[output.textContent.length - 1];
            console.log("lastInput:", lastInput);
            // output.textContent += "0.";  
        }
        output.textContent += number.textContent;
        console.log(output.textContent);
    })
}
