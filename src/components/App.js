import React from 'react';
import { Container, Button } from 'react-bootstrap'; 
import OutputScreen from './outputScreen';

class App extends React.Component {
    render() {
        return (
            <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <Calculator/>
            </Container>
        );
    }
} 

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: '', 
            answer:'', 
            point: false,　
            operand: false,
            lastEle: '',
        }
    }

    handleClick = (event) => {
        let temp = this.state.formula;
        if (isNaN(event) && temp.length === 0) return ;
        else if (event === '=' && isNaN(this.state.lastEle)) return ;
        else if (event === '=') {
            let result = this.calculation(this.state.formula);
            temp = '';
            this.setState({
                answer: result,
            })
        }
        else if (event === 'AC') {
            temp = '';
        }
        else if (event === '.') {
            if (!isNaN(this.state.lastEle) && !this.state.point) {
                temp += event;
                this.setState({
                    point: true,
                })
            }
        }
        else if (isNaN(event)) {
            if (isNaN(this.state.lastEle) && this.state.lastEle !== '.' ) {
                temp = temp.substr(0, temp.length - 3) + ` ${event} `;
            }
            else if (this.state.lastEle !== '.'){
                temp += ` ${event} `;
                this.setState({
                    point: false,
                })
            }
        }
        else {
            temp += event;
        }

        this.setState({
            formula: temp,
            lastEle: event !== 'AC' ? event : this.state.lastEle,
        })
    }

    calculation(formula) {
        const rpn = this.RPN(formula);
        console.log(rpn);

        let digits = [];
        rpn.forEach(ele => {
            if (isNaN(ele)) {
                let num1 = digits.pop();
                let num2 = digits.pop();
                switch (ele) {
                    case '+':
                        digits.push(num2 + num1);
                        break;
                    case '-':
                        digits.push(num2 - num1);
                        break;
                    case '×':
                        digits.push(num2 * num1);
                        break;
                    case '÷':
                        digits.push(num2 / num1);
                        break;                        
                    case '%':
                        digits.push(num2 % num1);
                        break;                        
                    default:
                        break;
                }
            }
            else {
                digits.push(parseFloat(ele));
            }
        });
        console.log(digits);
        return digits[0];
    }

    RPN(formula) {
        const priority = {
            '+' : 1,
            '-' : 1,
            '×' : 2,
            '÷' : 3,
            '%' : 4,
        }
        let operandStack = [];
        let rpn = [];
        formula.split(' ').forEach(element => {
            if (isNaN(element)) {
                if (operandStack.length <= 0) {
                    operandStack.push(element);
                }
                else if (priority[operandStack[operandStack.length-1]] < priority[element]){
                    operandStack.push(element);
                }
                else {
                    while (operandStack.length && priority[operandStack[operandStack.length-1]] >= priority[element]){
                        rpn.push(operandStack.pop());
                    }
                    operandStack.push(element);
                }
            }
            if (!isNaN(element)) {
                rpn.push(element); 
            }
        });
        while (operandStack.length) {
            rpn.push(operandStack.pop());
        }
        return rpn;
    }


    renderKeypad(i) {
        let definition = '';
        let colorAndShape = 'outline-info ';
        if (i === 'AC' || i === '0') {
            definition = 'm-2 zero';
            colorAndShape += ' rounded-pill ';
        }
        else {
            definition = 'm-2';
            colorAndShape += ' rounded-circle ';
        }
        return (
            <Button className={definition} variant={colorAndShape}
                onClick={() => this.handleClick(i)}>
                {i}
            </Button>
        )
    }

    render() {
        return  (
            <div>
                <OutputScreen answer={this.state.answer} formula={this.state.formula}/>
                <div className="d-flex">
                    {this.renderKeypad('AC')}
                    {this.renderKeypad('%')}
                    {this.renderKeypad('÷')}
                </div>
                <div className="d-flex">
                    {this.renderKeypad('7')}
                    {this.renderKeypad('8')}
                    {this.renderKeypad('9')}
                    {this.renderKeypad('×')}
                </div>
                <div className="d-flex">
                    {this.renderKeypad('4')}
                    {this.renderKeypad('5')}
                    {this.renderKeypad('6')}
                    {this.renderKeypad('-')}
                </div>
                <div className="d-flex">
                    {this.renderKeypad('1')}
                    {this.renderKeypad('2')}
                    {this.renderKeypad('3')}
                    {this.renderKeypad('+')}
                </div>
                <div className="d-flex">
                    {this.renderKeypad('0')}
                    {this.renderKeypad('.')}
                    {this.renderKeypad('=')}
                </div>
            </div>
        )
    }
}

export default App;
