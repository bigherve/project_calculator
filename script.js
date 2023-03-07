const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

function setThemeLight() {
    document.documentElement.className = 'light';
}

function setThemeDark() {
    document.documentElement.className = 'dark';
}

lightBtn.addEventListener('click', setThemeLight);
darkBtn.addEventListener('click', setThemeDark);

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const screen = document.querySelector('#text');
const buttons = document.querySelectorAll('button');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function appendNumber() {
    screen.textContent = displayValue;
    if (displayValue.length > 10) {
        screen.textContent = displayValue.substring(0, 10);
    }
}

appendNumber();

function operate(operator, number1, number2) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) {
                return 'lmao';
            } else {
                return a / b;
            }
        },
    };

    if (operator in operators) {
        return operators[operator](number1, number2);
    }
}

buttons.forEach((item) =>
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('op')) {
            inputOperand(e.value);
            updateDisplay();
        } else if (e.target.classList.contains('num')) {
            inputOperator(e.value);
        } else if (e.target.classList.contains('sum')) {
            inputEquals();
            updateDisplay();
        } else if (e.target.classList.contains('dot')) {
            inputDecimal(e.value);
            updateDisplay();
        } else if (e.target.classList.contains('clear')) clearDisplay();
        updateDisplay();
    })
);

equals.addEventListener('click', () => {
    const [number1, operator, number2] = displayValue
        .match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/)
        .slice(1);

    clearDisplay();
    appendNumber(operate(operator, number1, number2));
});