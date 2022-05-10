
class Calculator 
{
    constructor(previous,current)
    {
        this.previous = previous;
        this.current  = current;
        this.clear();
    }

    clear()
    {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }


    append(number)
    {
        if(number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation)
    {   
        if(this.currentOperand === '') return 
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    display(number)
    {
        const string = number.toString();
        const integer = parseFloat(string.split('.')[0]);
        const decimal = string.split('.')[1]
        let integerDisplay;
        if(isNaN(integer))
        {
            integerDisplay = '';
        }else{
            integerDisplay = integer.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimal != null)
        {
            return `${integerDisplay}.${decimal}`
        }else{
            return integerDisplay;
        }

    }

    compute()
    {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return 
        switch(this.operation)
        {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }


    update()
    {   
        this.current.innerText= this.display(this.currentOperand);
        if(this.operation != null)
        {
            this.previous.innerText = this.display(this.previousOperand) + this.operation;
        }else{
            this.previous.innerText= this.display(this.previousOperand);
        }
    }

}


const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const allClear = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');


const calculator = new Calculator(previous,current);

numbers.forEach(button => {
    button.addEventListener("click",() => 
    {
        calculator.append(button.innerText)
        calculator.update();
    })
})

operations.forEach(button => {
    button.addEventListener("click",() => 
    {
        calculator.chooseOperation(button.innerText)
        calculator.update();
    })
})

    equals.addEventListener("click",() => 
        {
            calculator.compute()
            calculator.update();
        })


    allClear.addEventListener("click",() => 
        {
            calculator.clear()
            calculator.update();
        })

    deleteButton.addEventListener("click", () =>
    {
            calculator.delete();
            calculator.update();
    })