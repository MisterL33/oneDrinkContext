import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ChatScreen from '../screens/ChatScreen';
import {createStackNavigator, createAppContainer, createSwitchNavigator, NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
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
    EditProfile: {
      screen: EditProfileScreen,
    },
    Chat: {
      screen: ChatScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#64489b',
      },
      headerLeft: null,
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
