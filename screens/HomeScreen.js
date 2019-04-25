import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, Button, TouchableOpacity, ImageBackground,View} from 'react-native';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../styles/home';
import store from '../redux/store';
import { connect } from 'react-redux'

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color="white" />
);
const AwesomeIconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={FontAwesome} iconSize={23} color="white" />
);



export class HomeScreen extends React.Component {
  
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

  state={
    user: {}
  }


  componentDidUpdate(){
    //console.log(this.props.user) // pour l'instant je n'ai pas les infos de l'user dans le component did mount a cause de la nature asynchrone du fetch
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.logButton} onPress={() => this.props.navigation.navigate('Profile', this.state.user)}>
            <View style={styles.buttonContent}>
                <Text style={styles.white}>Mon compte {this.props.user != null && this.props.user.pseudo} </Text>
            </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(HomeScreen)