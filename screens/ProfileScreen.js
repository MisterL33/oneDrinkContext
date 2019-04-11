import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,Button,TouchableOpacity,TouchableHighlight,ImageBackground,View} from 'react-native';
import defaultImage from '../assets/images/onedrink.png';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { connect } from 'react-redux'
import { ImagePicker, ImageManipulator } from 'expo';


export class ProfileScreen extends React.Component {


  handleEditImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync()
    const base64Image = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: 90}, { flip: { vertical: true }}],
      {base64: true}
    );
    console.log(base64Image.base64)
    let profileImage = {uri:'data:image/png;base64,' + base64Image.base64}
    console.log(profileImage)
    this.setState({profileImage: profileImage})

  }

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

   logout = () =>{
    firebase.auth().signOut()
  }

  componentDidMount(){
    console.log('avant if')
    console.log(this.props.user)
  }

  componentDidUpdate() { // permet d'afficher les prochaines props (ici ce sont les props venant de firebase pour users)
    //console.log(nextProps.user);
  }

  render() {
    
    return (
      <View style={{height: '100%'}}>
        {this.props.user != null &&
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 35, height:'20%' }}>
            <TouchableHighlight underlayColor={'#64489b'} onPress={() => this.handleEditImage()}>
              <Image source={{uri: this.props.user.photoURL}} style={{ flex: 1, height: 50, width: 50  }} resizeMode="contain" />
            </TouchableHighlight>
          </View>
        }
        <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 25, height:'15%'}}>
          <TouchableOpacity onPress={() => this.handleEditProfile()} style={{borderRadius: 10, width: '80%', backgroundColor: '#64489b', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons style={{color: 'white', position: 'absolute', left: 20}} size={50} name="account-edit" />
              <View style={{flex: 1}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 22}}>Editer le profil</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 25, height:'15%'}}>
          <TouchableOpacity onPress={() => this.logout()} style={{borderRadius: 10, width: '80%', backgroundColor: '#64489b', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons style={{color: 'white', position: 'absolute', left: 20}} size={50} name="logout" />
              <View style={{flex: 1}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 22}}>Se déconnecter</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
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

const mapStateToProps = state => ({
  user: state.user
})


export default connect(
  mapStateToProps,
)(ProfileScreen)