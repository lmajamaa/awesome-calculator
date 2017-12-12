import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value, style: this.props.style, secondValue: this.props.secondFunction};
  }
  
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.secondFunctionEnabled ? nextProps.secondFunction : nextProps.value,
      secondValue: nextProps.secondFunctionEnabled ? nextProps.value : nextProps.secondFunction,
      style: nextProps.style
    });
  }
  handlePress = () => {
    this.props.onPress(this.state.value + this.getParenthesis(this.state.value));
  }
  getParenthesis = (value) => {
    let functions = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'];
    return functions.includes(value) ?  '(' : '';
    
  }
  render() {
    return (
      <TouchableOpacity style={[styles.calculatorButton, styles[this.props.style]]} onPress={this.handlePress} activeOpacity={0.5}>
        <Text style={styles.secondFunctionText}>{this.props.secondFunction ? this.state.secondValue: null}</Text>
        <Text style={styles.calculatorButtonText}>{this.props.symbol ? this.props.symbol : this.state.value}</Text>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  calculatorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#d6d7da'
  },
  empty: {
    borderWidth: 0,
    backgroundColor: '#fffcf1'
  },
  number: {
    backgroundColor: '#3a3d44'
  },
  operator: {
    backgroundColor: '#2c2d32'
  },
  mFunction: {
    backgroundColor: '#23254a'
  },
  variable: {
    backgroundColor: '#23254a'
  },
  clear: {
    backgroundColor: '#62757f'
  },
  secondFunction: {
    backgroundColor: '#d6ad5a'
  },
  equals: {
    backgroundColor: '#c72f2e'
  },
  calculatorButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondFunctionText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'right'
  },
});