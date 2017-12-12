import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default class CalculatorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {equation: this.props.equation};
  }
  componentWillReceiveProps = (nextProps) => {
    this.state.history = nextProps.history;
    this.state.equation = nextProps.equation;
  }
  handlePress = () => {
    this.props.onPress(this.props.value);
  }
  
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.historyRow}>
          <View style={styles.flex}>
            <TextInput style={styles.historyText} multiline={true} numberOfLines={3} autoGrow={false} editable={false} value={this.state.history}/>
          </View>
        </View>
        <View style={styles.equationRow}>
          <View style={styles.flex}>
            <Text style={styles.equationText} numberOfLines={2} autoGrow={false}>{this.state.equation}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  historyRow: {
    flex: 2,
    flexDirection: 'row',
  },
  equationRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flex: {
    marginTop: 10,
    marginRight: 5,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  equationText: {
    fontSize: 30,
    marginBottom: 20,
  },
  historyText: {
    fontSize: 20,
    textAlignVertical: 'bottom',
    textAlign: 'right',
  },
});