document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let firstOperand = '';
  let secondOperand = '';
  let operator = null;

  const updateDisplay = () => {
    if (operator === null) {
      display.textContent = firstOperand || '0';
    } else {
      let operatorSymbol = '';
      switch (operator) {
        case 'add':
          operatorSymbol = '+';
          break;
        case 'subtract':
          operatorSymbol = '−';
          break;
        case 'multiply':
          operatorSymbol = '×';
          break;
        case 'divide':
          operatorSymbol = '÷';
          break;
      }
      display.textContent = `${firstOperand} ${operatorSymbol} ${secondOperand}`;
    }
  };

  document.querySelector('.buttons').addEventListener('click', (event) => {
    const target = event.target;
    const value = target.getAttribute('data-value');
    const action = target.getAttribute('data-action');

    if (value) {
      if (operator === null) {
        firstOperand += value;
      } else {
        secondOperand += value;
      }
      updateDisplay();
    }

    if (action) {
      if (action === 'clear') {
        firstOperand = '';
        secondOperand = '';
        operator = null;
        updateDisplay();
      } else if (action === 'equals') {
        if (firstOperand && secondOperand && operator) {
          const result = calculate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
          display.textContent = result;
          firstOperand = result.toString();
          secondOperand = '';
          operator = null;
        }
      } else {
        operator = action;
      }
      updateDisplay();
    }
  });

  const calculate = (a, b, operator) => {
    switch (operator) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return b !== 0 ? a / b : 'Error';
      default:
        return 0;
    }
  };
});
