import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Routing/router';
import StateContainer from './Context/stateManager';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  
  render() {
    return (
      <StateContainer>
        <LoginScreen />
      </StateContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
