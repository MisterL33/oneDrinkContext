import { StyleSheet } from "react-native"

export default StyleSheet.create({    
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      backgroundColor: 'rgba(0,0,0,.6)',
      
    },

    spinner: {
        width: '100%',
        height: '100%'
    },
  
    white: {
      color: 'white',
    },
  
    atRight: {
      position: 'relative',
      right: 15
    },
  
    atRightPlus: {
      position: 'relative',
      right: 25
    },
  
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      marginTop: '30%',
      alignItems: 'center',
      marginHorizontal: 50,
    },
  

  })