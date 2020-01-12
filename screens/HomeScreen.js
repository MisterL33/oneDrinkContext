import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, ToucheableOpacity, TouchableHighlight, Button } from 'react-native';
import { LinearGradient } from 'expo';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry';
import SliderEntry from '../components/SliderEntry';
import styles, { colors } from '../styles/SliderColors';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';
import {ENTRIES1} from '../static/entries';
import modalStyle from '../styles/modal';
import { connect } from 'react-redux';
import store from "../redux/store/index";
import { setModalVisibility } from '../redux/actions';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';
import icon from '../assets/images/onedrink.png';
import SafeAreaView from 'react-native-safe-area-view';

const AwesomeIconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={FontAwesome} iconSize={23} color="white" />
);


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;



class HomeScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isModalVisible: false,
        };
    }

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

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
    }

    tallCarousel (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>{`${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
            </View>
        );
    }

    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    handleCloseModal = () =>{
      store.dispatch(setModalVisibility(false))
      this.props.navigation.navigate('Chat')
    }

    render () {
        const tallCarousel = this.tallCarousel('Salon', 'Avec qui voulez-vous boire ce soir ?');
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                      { tallCarousel }
                      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                        <SCLAlert onRequestClose={() =>this.handleCloseModal()} theme="info" show={store.getState().isModalVisible} title="" subtitle="Voulez-vous envoyer une invitation ?">
                          <SCLAlertButton theme="info" onPress={() => this.handleCloseModal()}>Oui</SCLAlertButton>
                        </SCLAlert>
                      </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = state => ({
  isModalVisible: state.isModalVisible
})

export default connect(
  mapStateToProps,
)(HomeScreen)