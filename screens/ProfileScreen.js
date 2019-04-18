import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,Button,TouchableOpacity,TouchableHighlight,ImageBackground,View, ActivityIndicator, StatusBar} from 'react-native';
import defaultImage from '../assets/images/onedrink.png';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { ImagePicker, ImageManipulator } from 'expo';
import * as Animatable from 'react-native-animatable';
import {uploadImageAsync, getFireBaseUser} from '../manager/AccountManager';


export class ProfileScreen extends React.Component {

  constructor(props){
    super(props)
  }

  state={
    photo:null,
    loading: false,
  }



  handleEditImage = async () => {

    let image = await ImagePicker.launchImageLibraryAsync()
    
    const compressedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: 0}, { flip: { vertical: false }}],
      {compress: 0.3},
    );
    this.setState({loading: true})
    let storagePhotoUrl = await uploadImageAsync(this.props.user.uid, compressedImage.uri, 'photo1')
    
    await firebase.database().ref("users/" + this.props.user.uid + '/').update({
      photo1: storagePhotoUrl,
    });
    getFireBaseUser(this.props.user.uid)
    this.setState({photo: storagePhotoUrl, loading: false})
  }



  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

   logout = () =>{
    firebase.auth().signOut()
  }

  componentWillMount(){
    this.setState({photo: this.props.user.photo1})
  }

  render() {
    
    return (
      <View style={{height: '100%'}}>

        {this.props.user != null &&
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 35, height:'20%' }}>
            <TouchableHighlight underlayColor={'#64489b'} onPress={() => this.handleEditImage()}>
              <ImageBackground source={{uri: this.state.photo}} imageStyle={{borderRadius: 10}} style={{ flex: 1, height: 150, width: 150  }} resizeMode="contain" >
                <TouchableOpacity>
                  <Animatable.Text  style={{color: 'black', position: 'absolute', left: 95, top: 100}} easing="ease-in"  animation="bounce" iterationCount={1} direction="alternate">
                    <MaterialCommunityIcons size={50} name="camera" />
                  </Animatable.Text>
                </TouchableOpacity>
              </ImageBackground> 
            </TouchableHighlight>
          </View>
        }

        {this.state.loading === true &&
        <View>
          <ActivityIndicator color='#64489b' size="large" />
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