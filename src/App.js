import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      displayValue: '0',
      operandAction: false,
      operator: null,
    };

    this.numberClick = this.numberClick.bind(this);
    this.dotClick = this.dotClick.bind(this);
    this.clearClick = this.clearClick.bind(this);
    this.doCalculation = this.doCalculation.bind(this);
  };

  numberClick(digit) {
    if (this.state.operandAction) {
      this.setState({
        displayValue: String(digit),
        operandAction: false,
      });
    } else {
      this.setState({
        displayValue: this.state.displayValue === '0' ? String(digit)
        : this.state.displayValue + String(digit),
      });
    }
  }

  dotClick() {
    if (this.state.operandAction) {
      this.setState({
        displayValue: '.',
        operandAction: false,
      });
    } else if (this.state.displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: this.state.displayValue + '.',
      });
    }
  }

  clearClick() {
    this.setState({
      value: null,
      displayValue: '0',
      operandAction: false,
      operator: null,
    });
  }

  doCalculation(nextOperator) {
    const nextValue = parseFloat(this.state.displayValue);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue,
    };

    this.setState({
      operandAction: true,
      operator: nextOperator,
    });

    if (this.state.value == null) {
      this.setState({
        value: nextValue,
      });
    } else if (this.state.operator && !this.state.operandAction) {
      const currentValue = this.state.value;
      const computedValue = operations[this.state.operator](currentValue, nextValue);
      this.setState({
        value: computedValue,
        displayValue: String(computedValue),
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header-heading">FreeCodeCamp JavaScript Calculator</h1>
        </header>
        {/*<div><pre>{JSON.stringify(this.state, null, 2)}</pre></div>*/}
        <div className="calculator container">
          <div id="display" className="result">
            {this.state.displayValue}
          </div>
          <div className="cal-buttons" id="buttons">
            <div className="grid-1">
              <button id="clear" onClick={() => this.clearClick()}>AC</button>
              <button id="divide" onClick={() => this.doCalculation('/')}>/</button>
              <button id="multiply" onClick={() => this.doCalculation('*')}>*</button>
            </div>
            <div className="grid-2">
              <button id="seven" onClick={() => this.numberClick(7)}>7</button>
              <button id="eight" onClick={() => this.numberClick(8)}>8</button>
              <button id="nine" onClick={() => this.numberClick(9)}>9</button>
              <button id="subtract" onClick={() => this.doCalculation('-')}>-</button>
            </div>
            <div className="grid-3">
              <button id="four" onClick={() => this.numberClick(4)}>4</button>
              <button id="five" onClick={() => this.numberClick(5)}>5</button>
              <button id="six" onClick={() => this.numberClick(6)}>6</button>
              <button id="add" onClick={() => this.doCalculation('+')}>+</button>
            </div>
            <div className="grid-4">
              <button id="one" onClick={() => this.numberClick(1)}>1</button>
              <button id="two" onClick={() => this.numberClick(2)}>2</button>
              <button id="three" onClick={() => this.numberClick(3)}>3</button>
              <button className="equals" id="equals" onClick={() => this.doCalculation('=')}>=</button>
            </div>
            <div className="grid-5">
              <button id="zero" onClick={() => this.numberClick(0)}>0</button>
              <button id="decimal" onClick={() => this.dotClick()}>.</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
