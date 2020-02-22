import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Calculator from './components/Calculator';

const App = () => (
  <View style={styles.container}>
    <Calculator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});

export default App;
