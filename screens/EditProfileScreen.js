import React from "react";
import {Image,TouchableHighlight,ScrollView,StyleSheet,Text,Button,TouchableOpacity,TextInput,KeyboardAvoidingView,View, ActivityIndicator, StatusBar} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";
import styles from "../styles/editprofile";
import { connect } from "react-redux";
import { ImagePicker, ImageManipulator } from 'expo';
import {uploadImageAsync, getFireBaseUser} from '../manager/AccountManager';

export class EditProfileScreen extends React.Component {

  constructor(props){
    super(props)
  }

  state={
    user:{}
  }

  handleEditImage = async(name) => {
    let image = await ImagePicker.launchImageLibraryAsync()
    
    const compressedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: 0}, { flip: { vertical: false }}],
      {compress: 0.3},
    )
    this.setState({loading: true})
    let storagePhotoUrl = await uploadImageAsync(this.props.user.uid, compressedImage.uri, name)
    await firebase.database().ref("users/").child(this.props.user.uid).child(name).set(storagePhotoUrl);
    this.setState({name: storagePhotoUrl, loading: false})
    getFireBaseUser(this.props.user.uid)
  }

  handleSubmitForm = async() => {
    await firebase.database().ref("users/" + this.props.user.uid + '/').update({
      pseudo: this.state.user.pseudo,
      description: this.state.user.description
    });
    this.props.navigation.navigate('Profile')
  }

  componentWillMount(){
    this.setState({user: this.props.user})
  }


  logout = () => {
    firebase.auth().signOut();
  };

  handleChangePseudo = (e) =>{
    let user = this.state.user
    user.pseudo = e.nativeEvent.text
    this.setState({user})
  }

  handeChangeDescription = (e) =>{
    let user = this.state.user
    user.description = e.nativeEvent.text
    this.setState({user})
  }




  render() {
    return (
      <ScrollView style={{ height: "100%", backgroundColor: "#E0E0E0" }}>
        <KeyboardAvoidingView
          style={{ height: "100%" }}
          keyboardVerticalOffset={80}
          behavior="position"
        >
          <Text
            style={{
              alignSelf: "center",
              marginTop: 25,
              marginBottom: 25,
              fontSize: 20
            }}
          >
            Photos
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              backgroundColor: "white"
            }}
          >
            <TouchableHighlight
              style={{ flex: 1, height: 150 }}
              underlayColor={"#64489b"}
              onPress={() => this.handleEditImage('photo1')}
            >
              {this.props.user.photo1 ? (
                <Image
                  source={{ uri: this.props.user.photo1 }}
                  style={{
                    width: 150,
                    height: 100,
                    alignSelf: "center",
                    marginTop: 15
                  }}
                  resizeMode="contain"
                />
              ) : (
                <MaterialCommunityIcons size={120} name="camera" />
              )}
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1, height: 150 }}
              underlayColor={"#64489b"}
              onPress={() => this.handleEditImage('photo2')}
            >
              {this.props.user.photo2 ? (
                <Image
                  source={{ uri: this.props.user.photo2 }}
                  style={{
                    width: 150,
                    height: 100,
                    alignSelf: "center",
                    marginTop: 15
                  }}
                  resizeMode="contain"
                />
              ) : (
                <MaterialCommunityIcons size={120} name="camera" />
              )}
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1, height: 150 }}
              underlayColor={"#64489b"}
              onPress={() => this.handleEditImage('photo3')}
            >
              {this.props.user.photo3 ? (
                <Image
                  source={{ uri: this.props.user.photo3 }}
                  style={{
                    width: 150,
                    height: 100,
                    alignSelf: "center",
                    marginTop: 15
                  }}
                  resizeMode="contain"
                />
              ) : (
                <MaterialCommunityIcons size={120} name="camera" />
              )}
            </TouchableHighlight>
            {this.state.loading === true &&
        <View>
          <ActivityIndicator color='#64489b' size="large" />
        </View>
        }
          </View>
          {this.state.user != null && (
            <View>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={{ height: 50 }}
                  underlineColorAndroid="transparent"
                  placeholder="Pseudo"
                  placeholderTextColor="black"
                  numberOfLines={1}
                  multiline={true}
                  value={this.state.user.pseudo}
                  onChange={(e) => this.handleChangePseudo(e)}
                />
              </View>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Description"
                  placeholderTextColor="black"
                  numberOfLines={10}
                  multiline={true}
                  value={this.state.user.description}
                  onChange={(e) => this.handeChangeDescription(e)}
                />
              </View>
            </View>
          )}
          <View style={{ flex: 1, alignContent: "center" }}>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <TouchableOpacity onPress={() => this.handleSubmitForm()} style={styles.logButton}>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    position: "relative",
                    top: 15
                  }}
                >
                  Enregister
                </Text>
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
});

export default connect(mapStateToProps)(EditProfileScreen);
