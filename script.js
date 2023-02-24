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

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function power(num1, num2) {
    return num1 ** num2;
}

/*function multiply(...nums) {
    return nums.reduce((acumilator, item) => acumilator * item, 1);
}

function division(...nums) {
    return nums.reduce((acumilator, item) => acumilator / item);
}*/

function operate1(opp, num1, num2) {
    if (opp === '+') {
        return add(num1, num2);
    } else if (opp === '-') {
        return subtract(num1, num2);
    } else if (opp === '*') {
        return multiply(num1, num2);
    } else if (opp === '/') {
        return divide(num1, num2);
    } else if (opp === '**') {
        return power(num1, num2);
    }
}

function operate2(operator, number1, number2) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '**': (a, b) => a ** b,
    };

    if (operator in operators) {
        return operators[operator](number1, number2);
    } else return 'ERROR!';
}