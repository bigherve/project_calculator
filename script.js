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
const screen = document.querySelector('#text');
const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

function clearDisplay() {
    displayValue = '';
    screen.textContent = displayValue;
}

function appendNumber(num) {
    displayValue += num;
    screen.textContent = displayValue;
}

function operate(operator, number1, number2) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    if (operator in operators) {
        return operators[operator](+number1, +number2);
    } else return 'ERROR!';
}

buttons.forEach((item) =>
    item.addEventListener('click', (e) => {
        if (e.target.value === 'clear') {
            clearDisplay();
        } else appendNumber(e.target.value);
    })
);

equals.addEventListener('click', () => {
    const [number1, operator, number2] = displayValue
        .match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/)
        .slice(1);

    clearDisplay();
    appendNumber(operate(operator, number1, number2));
});