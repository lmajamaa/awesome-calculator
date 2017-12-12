import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Calculator from './components/Calculator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return ( 
      <View style={styles.container}>
        <Calculator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});