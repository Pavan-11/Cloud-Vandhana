var operator = document.querySelectorAll('.operator');

var result = document.querySelector('.result');

var buttons = document.querySelector('.buttons');


var canOperate = false;

var clearToggle = false;

var timeFlag = false;

var valStack = [];

buttons.addEventListener("click", function(event){
    var resultValue = result.innerHTML;
    var button = event.target;

    if (button.className.indexOf("resetBtn") > -1){
        init();
    }else if (button.className.indexOf('number') > -1){
        canOperate = true;

        if(clearToggle){
            resultValue = "";
            clearToggle = false;
        }
        if(resultValue == '0' && button.className.indexOf('dot') === -1){
            resultValue = '';
        }
        result.innerHTML = resultValue + button.innerHTML;
    }else{
        clearToggle= true;
        if (button.innerHTML === '*' || button.innerHTML === '/') {
            if (!timeFlag) {
                valStack.push(resultValue);
                valStack.push(button.innerHTML);
                timeFlag = true;
                return;
            }
        } else if (button.innerHTML === '%') {
            resultValue = parseFloat(resultValue / 100);
            // valStack.push(resultValue);
            result.innerHTML = resultValue;
            return;
        }
        if (valStack.length > 1) {
            var op = valStack.pop();
            var num1 = valStack.pop();
            resultValue = calculate(num1, resultValue, op);
            if ((button.innerHTML === '+' || button.innerHTML === '-' || button.innerHTML === '=') && timeFlag) {
                while (valStack.length > 1) {
                    op = valStack.pop();
                    num1 = valStack.pop();
                    resultValue = calculate(num1, resultValue, op);
                }
                timeFlag = false;
            }

        }
        valStack.push(resultValue);
        valStack.push(btn.innerHTML);
        result.innerHTML = resultValue;
        if (btn.innerHTML === '=') {
            clearToggle = true;
            timeFlag = false;
            valStack = [];
            return;
        }
    canOperate = false;
    }
},false);

function calculate(num1, num2, op) {
    switch (op) {
        case "+":
            return parseFloat(num1) + parseFloat(num2);
        case "-":
            return parseFloat(num1) - parseFloat(num2);
        case "*":
            return parseFloat(num1) * parseFloat(num2);
        case "/":
            return parseFloat(num1) / parseFloat(num2);

    }
}

function init() {
    clearToggle = false;
    timeFlag = false;
    valStack = [];
    canOperate = false;
    result.innerHTML = "0";
}