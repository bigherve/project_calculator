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

function operate(operator, number1, number2) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    if (operator in operators) {
        return operators[operator](number1, number2);
    } else return 'ERROR!';
}
let displayValue = '';
const screen = document.querySelector('#text');
const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

buttons.forEach((item) =>
    item.addEventListener('click', (e) => {
        if (e.target.value === 'clear') {
            clearDisplay();
        } else appendNumber(e.target.value);
    })
);

function clearDisplay() {
    displayValue = '';
    screen.textContent = displayValue;
}

function appendNumber(num) {
    displayValue += num;
    screen.textContent = displayValue;
}