import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Routing/router';

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import rootReducer from "./redux/reducers/index";
const store = createStore(rootReducer);

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
