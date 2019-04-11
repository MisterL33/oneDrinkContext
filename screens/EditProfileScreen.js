import React from 'react';
import {Image,TouchableHighlight,ScrollView,StyleSheet,Text,Button,TouchableOpacity,TextInput,KeyboardAvoidingView,View} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import styles from '../styles/editprofile';
import { connect } from 'react-redux';

export class EditProfileScreen extends React.Component {

  handleEditImage = () => {
    alert('ok')
  }

  handleEditProfile = () => {
    console.log(this.props.navigation.navigate('EditProfileScreen'))
  }

   logout = () =>{
    firebase.auth().signOut()
  }

  render() {
    return (
      <ScrollView style={{height: '100%', backgroundColor: '#E0E0E0'}}>
          <KeyboardAvoidingView style={{height: '100%'}}  keyboardVerticalOffset={80} behavior="position">
            <Text style={{alignSelf:'center', marginTop: 25, marginBottom: 25, fontSize: 20}}>Photos</Text>
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', backgroundColor: 'white'}}>
                <TouchableHighlight style={{flex: 1, height: 150}} underlayColor={'#64489b'} onPress={() => this.handleEditImage()}>
                    {/*<Image source={defaultImage} style={{width: 150, height: 100, alignSelf: 'center', marginTop: 15}}  resizeMode="contain" />*/}
                    <MaterialCommunityIcons size={120} name="camera" />  
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 1, height: 150}} underlayColor={'#64489b'} onPress={() => this.handleEditImage()}>
                    {/*<Image source={defaultImage} style={{width: 150, height: 100, alignSelf: 'center', marginTop: 15}}  resizeMode="contain" />*/}
                    <MaterialCommunityIcons size={120} name="camera" />  
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 1, height: 150}} underlayColor={'#64489b'} onPress={() => this.handleEditImage()}>
                    {/*<Image source={defaultImage} style={{width: 150, height: 100, alignSelf: 'center', marginTop: 15}}  resizeMode="contain" />*/}
                    <MaterialCommunityIcons size={120} name="camera" />  
                </TouchableHighlight>
            </View>
            {this.props.user != null &&
            <View>
              <View style={styles.textAreaContainer} >
                  <TextInput
                  style={{height: 50}}
                  underlineColorAndroid="transparent"
                  placeholder="Pseudo"
                  placeholderTextColor="black"
                  numberOfLines={1} 
                  multiline={true}
                  value={this.props.user.displayName}
                  />
              </View>
              <View style={styles.textAreaContainer} >
                  <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Description"
                  placeholderTextColor="black"
                  numberOfLines={10}
                  multiline={true}
                  value={this.props.user.displayName}
                  />
              </View>
            </View>
            }
            <View style={{flex: 1, alignContent: 'center'}}>
              <View style={{width: '60%', alignSelf: 'center'}}>
                <TouchableOpacity style={styles.logButton} >
                  <Text style={{color: 'white', alignSelf: 'center', position:'relative', top: 15}}>Enregister</Text>
                </TouchableOpacity>
              </View>
            </View>
        </KeyboardAvoidingView>
        

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(
  mapStateToProps,
)(EditProfileScreen)