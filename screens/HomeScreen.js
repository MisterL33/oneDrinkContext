import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, Button, TouchableOpacity, ImageBackground,View} from 'react-native';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../styles/home';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color="white" />
);
const AwesomeIconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={FontAwesome} iconSize={23} color="white" />
);



export default class HomeScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <HeaderButtons HeaderButtonComponent={AwesomeIconsHeaderButton}>
          <Item title="search" iconName="user" onPress={() => navigation.navigate('Profile')} />
          <Item title="Profil" onPress={() => navigation.navigate('Profile')} />
        </HeaderButtons>
      ),
    };
  };

  constructor(props){
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.logButton} onPress={() => this.props.navigation.navigate('Profile')}>
            <View style={styles.buttonContent}>
                <Text style={styles.white}>Mon compte</Text>
            </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


