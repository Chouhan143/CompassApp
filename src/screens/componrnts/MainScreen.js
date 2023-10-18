import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SubscriptionModal from './SubscriptionModal';

const MainScreen = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app
      return true; // Prevent default behavior (i.e., do not navigate back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);

  // console.log()

  const logout = () => {
    navigation.navigate('Login');
  };

  const options = [
    {
      name: 'Sherry Merchants English SMartLuoPan® ',
      imageSource: require('../assets/images/originalCompas.png'),
    },
    {
      name: 'Annual Ring 2024',

      imageSource: require('../assets/images/Basic.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Period 8 & Period 9 Flying Star LuoPan',

      imageSource: require('../assets/images/amit2.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Xuan Kong Da Gua Rings ',

      imageSource: require('../assets/images/amit3.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Transparent version',

      imageSource: require('../assets/images/kigi.png'),
    },

    {
      name: 'Annual Ring 2023',

      imageSource: require('../assets/images/2023.png'),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0000AE',
        // paddingTop: responsiveHeight(5),
      }}>
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[0]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[0].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[0].name}
                </Text>
                {/* <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[0].description}
                </Text> */}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[1]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
                paddingTop: responsiveHeight(2),
              }}>
              <Image
                source={options[1].imageSource}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[1].name}
                </Text>
                {/* <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[1].description}
                </Text> */}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {/* frist Ui View  */}

      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[2]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[3].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
                  resizeMode: 'contain',
                  paddingTop: responsiveHeight(2),
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[3].name}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[3].description}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[3]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[4].imageSource}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[4].name}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#fff',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[4].description}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {/* second View ui  */}

      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: responsiveWidth(4),
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[4]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[2].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[2].name}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[2].description}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompassOverlay', {option: options[5]})
            }>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#007FD1', '#007FD1', '#007FD1']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(29),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[5].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(30),
                  height: responsiveWidth(30),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={2}>
                  {options[5].name}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[5].description}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
