import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorScreen from './CalculatorScreen';
import CalculatorButton from './CalculatorButton';
import { AppSecrets} from '../config';

let math = require('mathjs');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {history: '', equation: ''};
  }
  
  handlePress = (key) => {
    let equation = this.state.equation;
    switch(key) {
      case '=': 
        this.evaluate(equation); // Evaluate
        break;
      case '+/-':
        if(equation.length > 0) {
          equation = math.eval('-(' + equation + ')'); // Change sign
          this.setState({equation});
        }
        break;
      case 'CLR':
        this.setState({equation: '', history: ''});// Clear
        break;
      case '2ⁿᵈ':
        this.setState({secondFunction: !this.state.secondFunction}); // Enable 2nd mode
        break;
      case '⌫':
        equation = equation.slice(0, -1);
        this.setState({equation});
        break;
      default:
        equation = equation + key;
        this.setState({equation}); // Add to equation
    }
  }
  evaluate = (equation) => {
    let operators = ['+', '-', '*', '÷'];
    let plotVars = ['x', 'y', 'z',];
    let lastChar = equation[equation.length - 1];
    if(operators.indexOf(lastChar) > -1 || lastChar == '.') // If last char is an operator or a decimal, remove it
      equation = equation.replace(/.$/, '');
    if (equation) {
      try {
        if (plotVars.some(r => equation.indexOf(r) >= 0)) { // Plot
          console.log('Plottable equation: ' + equation);
          this.retrievePlot(equation);
        } else {
          let result = math.eval(equation).toString();
          console.log(result);
          this.setState({
            history: this.state.history + equation + '=' + result + '\n',
            equation: result
          });
        }
      } catch(err) {
        console.log(err);
        this.setState({
          history: this.state.history + 'Error\n',
        });
      }
    }
  }
    
  retrievePlot = async (equation) => {
    try {
      let response = await fetch(AppSecrets.url + '?clientID=' + AppSecrets.clientID + '&equation=' + encodeURIComponent(equation));
      let responseText = await response.text();
      console.log(responseText);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return ( 
      <View style={styles.column}>
        <View style={styles.screen}>
          <CalculatorScreen history={this.state.history} equation={this.state.equation}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'clear'} onPress={this.handlePress} value={'CLR'}/>
          <CalculatorButton style={'variable'} onPress={this.handlePress} value={'⌫'}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'^'} symbol={'xˣ'}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'('}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={')'}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'pi'} symbol={'π'}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'/'} symbol={'÷'}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'^3'} symbol={'x³'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'7'} secondFunction={'x'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'8'} secondFunction={'y'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'9'} secondFunction={'z'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'*'} symbol={'x'}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'^2'} symbol={'x²'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'4'} secondFunction={'sin'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'5'} secondFunction={'cos'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'6'} secondFunction={'tan'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'-'}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'sqrt'} symbol={'√'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'1'} secondFunction={'log'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'2'} secondFunction={'ln'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'3'} secondFunction={'e'} secondFunctionEnabled={this.state.secondFunction}/>
          <CalculatorButton style={'operator'} onPress={this.handlePress} value={'+'}/>
        </View>
        <View style={styles.row}>
          <CalculatorButton style={'secondFunction'} onPress={this.handlePress} value={'2ⁿᵈ'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'+/-'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'0'}/>
          <CalculatorButton style={'number'} onPress={this.handlePress} value={'.'}/>
          <CalculatorButton style={'equals'} onPress={this.handlePress} value={'='}/>
        </View>
      </View>
    );
  }
}
        
const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  screen: {
    flex: 4,
    flexDirection: 'row',
  }
});