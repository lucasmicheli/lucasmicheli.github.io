let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        // NaN: Not a Number
        handleSymbol(value);
    } else {
        // It's a Number!
        handleNumber(value);
    }
    rerender();
}

function rerender() {
    screen.innerText = buffer;
}

function handleSymbol(value) {
    
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

// × &times; ÷ &divide; - &minus; + &plus; = &equals; ← &larr;

function handleMath(symbol) {
    if (buffer === "0") {
        return; // Do nothing
    }

    const intBuffer = parseInt(buffer);
    // or -> const intBuffer = +buffer;

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}
  
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber (number) {
    if (buffer === "0") {
        buffer = number;
    } else {
        buffer += number;
    }
}

function init () {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();