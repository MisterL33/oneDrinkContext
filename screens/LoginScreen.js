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
import { WebBrowser } from 'expo';
import icon from '../assets/images/onedrink.png'
import { MonoText } from '../components/StyledText';
import fond from '../assets/images/fond.jpg';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {signInWithFacebook} from "../manager/AccountManager";
import styles from '../styles/login';

export default class LoginScreen extends React.Component {

  constructor(props)
  {
    super(props)
  }


  componentDidMount = () => {

  }

 

  render() {
    return (

    <ImageBackground source={fond} style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={icon}
              style={styles.welcomeImage}
            />
                <Text style={styles.getStartedText}>OneDrink</Text>
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

              <TouchableOpacity style={styles.logButton} onPress={this.signInWithFacebook}>
                <View style={styles.buttonContent}>
                    <FontAwesome style={[styles.atRight, styles.white]} name="user" size={15} />
                    <Text style={styles.white}>         Créer un compte           </Text>
                </View>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
