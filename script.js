
//  creating Calculator Class

class Calculator{
    constructor(previousOperandElm, currentOperandElm){
        this.previousOperandElm = previousOperandElm
        this.currentOperandElm = currentOperandElm
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = null
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand ===  '') return
        if(this.currentOperand !==  ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand//`${this.currentOperand} ${operation}`
        this.currentOperand = ''

    }

    compute(){
        let computation = null
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
            default:
                return
        }
         this.currentOperand = computation
         this.operation = null
         this.previousOperand = ''
    }

    getDisplayNumber(number){
        const strNumber = number.toString()
        const integerDigits = parseFloat(strNumber.split('.')[0])
        const decimalDigits = strNumber.split('.')[1]
       let integerDisplay = null;
       if(isNaN(integerDigits)){
           integerDisplay = ''
       }else{
           integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0});
       }
       if(decimalDigits != null){
           return `${integerDisplay}.${decimalDigits}`
       }else{
           return integerDisplay
       }
    }

    updateDisplay(){
        this.currentOperandElm.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation !== null){
            this.previousOperandElm.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandElm.innerText = this.getDisplayNumber(this.previousOperand)
        }
    }
}

// selecting Dom elements
const numbersButtons = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandElm = document.querySelector('[data-previous-operand]');
const currentOperandElm = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElm, currentOperandElm);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click',() => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})