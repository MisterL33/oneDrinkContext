import HomeScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';

  
  const RootStack = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Home: {
        screen: HomeScreen
      },

  });
  const Navigator = createAppContainer(RootStack);

  export default Navigator;