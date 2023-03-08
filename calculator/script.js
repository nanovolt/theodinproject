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