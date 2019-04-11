import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Routing/router';
import { Provider } from 'react-redux'
import store from './redux/store';

export default class App extends React.Component {
  
  
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
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
