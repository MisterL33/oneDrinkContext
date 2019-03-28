import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import {
  Button,
  TouchableOpacity,
} from 'react-native';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {createStackNavigator, createAppContainer, createSwitchNavigator, NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import store from "../redux/store/index";
import { profileRedirect } from "../redux/actions/index";
window.store = store;
window.profileRedirect = profileRedirect;


const AuthStack = createStackNavigator({ Login: LoginScreen });

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#64489b',
      },
      headerTitleStyle: {
        color: '#fff',
        textAlign: 'center',
        flex: 1
      },
      headerTitle: 'OneDrink',
    },
  }
);


  export default Navigator = createAppContainer(createSwitchNavigator(
    {
      
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
      
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));
