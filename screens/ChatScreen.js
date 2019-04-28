import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from 'react-redux';
import store from "../redux/store/index";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView, ToucheableOpacity, TouchableHighlight, Button } from 'react-native';
class ChatScreen extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Salut Laurent, on se retrouve où ?",
          createdAt: new Date(),
          user: {
            _id: 2,
          }
        }
      ]
    });
  }

  componentDidMount(){
    setTimeout(
        function() {
            this.setState({
                messages: [
                    {
                        _id: 2,
                        text: "J'aime beaucoup le rhum",
                        createdAt: new Date(),
                            user: {
                                _id: 2,
                            }
                        },
                    {
                        _id: 1,
                        text: "Salut Laurent, on se retrouve où ?",
                        createdAt: new Date(),
                            user: {
                                _id: 2,
                            }
                    } 
                ]
              });
        }
        .bind(this),
        3000
    );
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
        <View style={{flex: 1}}>
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                _id: 1
                }}
            />
            {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user
})
  
export default connect(
    mapStateToProps,
)(ChatScreen)