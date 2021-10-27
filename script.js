let buttons = document.querySelectorAll('.calculate__button');
let display = document.querySelector('.input-control');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
      
for (let button of buttons) {
  if (button.dataset.number) {
    button.addEventListener('click', inputNumber);
  } else if (button.dataset.operation === 'plusmn') {
    button.addEventListener('click', plusmn);
  } else if (button.dataset.operation) {
    button.addEventListener('click', operation);
  } else if (button.dataset.delete) {
    button.addEventListener('click', deleteNumber);
  } else if (button.dataset.point) {
    button.addEventListener('click', decimal);
  } else if (button.dataset.clear) {
    button.addEventListener('click', clear);
  } else if (button.dataset.root) {
    button.addEventListener('click', root);
  }
}
function inputNumber(evt) {
  let number = evt.target.dataset.number;
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function plusmn() {
  let number = display.value;
  if (isNaN(number)) {
    return error();
  }
  if (number === '0') {
    display.value = '0';
  } else if (number < '0') {
    display.value = number.slice(1);
  } else {
    display.value = `-${number}`;
  }
}

function operation(evt) {
  let operation = evt.target.dataset.operation;
  let localOperationMemory = display.value;
  if (Number.isNaN(memoryCurrentNumber) || memoryCurrentNumber === Infinity) {
    return error();
  }

  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    switch (memoryPendingOperation) {
      case '+':
        memoryCurrentNumber += parseFloat(localOperationMemory);
        break;
      case '-':
        memoryCurrentNumber -= parseFloat(localOperationMemory);
        break;
      case '*':
        memoryCurrentNumber *= parseFloat(localOperationMemory);
        break;
      case '/':
        memoryCurrentNumber /= parseFloat(localOperationMemory);
        break;
      case '**':
        memoryCurrentNumber **= parseFloat(localOperationMemory);
        break;
      default:
      memoryCurrentNumber = parseFloat(localOperationMemory);
    }

    if (Number.isNaN(memoryCurrentNumber) || memoryCurrentNumber === Infinity) {
      return error();
    }
     
        display.value = parseFloat(parseFloat(memoryCurrentNumber).toFixed(15)).toString();
        memoryPendingOperation = operation;
        minusOperation = '';
  }
}

function decimal(evt) {
  let decimalMemory = display.value;
  
  if (memoryNewNumber) {
    decimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (decimalMemory.indexOf('.') === -1) {
      decimalMemory += '.';
    }
  }

  display.value = decimalMemory;
}

function clear(evt) { 
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
}

function root() {
  let number = display.value;
  if (number <= '0' || isNaN(number)) {
    error();
  } else {
    display.value = Math.sqrt(number);
  }
}

function error() {
    return display.value = 'Ошибка';
}