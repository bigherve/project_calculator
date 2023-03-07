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

let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const screen = document.querySelector('#text');
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

function clearDisplay() {
    displayValue = '';
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

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function operate(operator, operand1, operand2) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) {
                return 'infinity';
            } else {
                return a / b;
            }
        },
    };

    if (operator in operators) {
        return operators[operator](Number(operand1), Number(operand2));
    }
}

function inputOperand(operand) {
    if (firstOperand === null) {
        if (firstOperand === '0' || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(firstOperator, firstOperand, secondOperand);
        displayValue = roundAccurately(result, 10).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(secondOperator, firstOperand, secondOperand);
        secondOperator = operator;
        displayValue = roundAccurately(result, 10).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondOperand = displayValue;
        result = operate(secondOperator, firstOperand, secondOperand);
        if (result === 'infinity') {
            displayValue = '¯\\_(ツ)_/¯';
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(firstOperator, firstOperand, secondOperand);
        if (result === 'infinity') {
            displayValue = '¯\\_(ツ)_/¯';
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (buttons[i].classList.contains('num')) {
                inputOperand(buttons[i].value);
                appendNumber();
            } else if (buttons[i].classList.contains('op')) {
                inputOperator(buttons[i].value);
            } else if (buttons[i].classList.contains('sum')) {
                inputEquals();
                appendNumber();
            } else if (buttons[i].classList.contains('dot')) {
                inputDecimal(buttons[i].value);
                appendNumber();
            }
        });
    }
}

clickButton();