import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    ImageBackground,
    View,
  } from 'react-native';


export default class ProfileScreen extends React.Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Test</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
