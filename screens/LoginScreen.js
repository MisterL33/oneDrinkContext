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
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import icon from '../assets/images/onedrink.png'
import fond from '../assets/images/fond4.jpg';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {signInWithFacebook} from "../manager/AccountManager";
import styles from '../styles/login';
import store from '../redux/store';
import {Dimensions} from 'react-native';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    headerShown: false 
  }

  constructor(props)
  {
    super(props)
  }

  state={
    width: null,
    height: null
  }


  componentDidMount = () => {
  }


  register = () => {
    this.props.navigation.navigate('Register')
  }
 

  render() {
    return (

    <ImageBackground source={fond} imageStyle={{resizeMode: "cover", width:"150%", marginLeft:"0%"}} style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={icon}
              style={styles.welcomeImage}
            />
                <Text style={styles.getStartedText}>OneDrink</Text>
          </View>
          <View style={styles.loginView}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
              placeholder="Mail"
            />
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              placeholder="Password"
            />
            <TouchableOpacity style={styles.logButton} onPress={this.register}>
                <View style={styles.buttonContent}>
                    <Text style={styles.white}>         LogIn           </Text>
                </View>
              </TouchableOpacity>
          </View>

          <View style={styles.getStartedContainer}>
              <TouchableOpacity style={styles.logButton} onPress={signInWithFacebook}>
                <View style={styles.buttonContent}>
                    <FontAwesome style={[styles.atRight, styles.white]} name="facebook-square" size={15} />
                    <Text style={styles.white}>Se connecter avec Facebook</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.logButton} onPress={signInWithFacebook}>
                <View style={styles.buttonContent}>
                    <FontAwesome style={[styles.atRight, styles.white]} name="google-plus" size={15} />
                    <Text style={styles.white}>Se connecter avec Google    </Text>
                </View>
              </TouchableOpacity>

              <Button 
                title="create account"
                onPress={this.register}
                color="#fff"
              />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
