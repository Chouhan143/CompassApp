import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SubscriptionModal from './SubscriptionModal';

const MainScreen = ({navigation}) => {
  const options = [
    {
      name: 'Sherry Merchants English SMartLuoPan® ',
      description: `This is the complete original face of our physical SMartLuoPan® This face gives you the true experience of the physical SMartLuoPan® . Hoewever if you wish to view the GPS view below, you would need to use the transparent face of this SMartLuoPan®.
You should follow the e-guide to get the full value and usage of each ring of this exhaustive SMartLuoPan®, it is like an intermediate fs course in itself.`,
      imageSource: require('../assets/images/originalCompas.png'),
    },
    {
      name: 'Annual Ring 2024',
      description:
        'Use this to determine the various impacts of energies for each direction in the following year (2024)',
      imageSource: require('../assets/images/Basic.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Period 8 & Period 9 Flying Star LuoPan',
      description: `If you want to compare the period 8 & Period 9 Flying Stars, use this template. The flying stars for both periods are arranged side by side and aligned to the facing direction so that the combination you see ahead is the direction where you are pointing towards.
Further, the Red combinations are the Sheng & Wang, so you know immediately which stars are useful and which are not. Read more about Sheng & Wang in the e-manual'`,
      imageSource: require('../assets/images/amit2.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Xuan Kong Da Gua Rings ',
      description: `If you a Xuan Kong Da Gua exponent, you will find all the information that you need here, including the color coded hexagrams as per the Xuan Kong Da Gua KUN REN YI formula. For all other formulas, ignore the colour coding of the hexagrams.
      
    🔵 Here you find 

    🔷 The degrees, 
    🔷 The Out of Gua Ring, 
    🔷 The HeTu Element of the Hexagram,
    🔷 The Hexagram Number in English 
           (king Wens numbering system)
    🔷 The Hexagram name in English
    🔷 The hexagram Image
    🔷 The HeTu number & the Period Luck 
            number
    🔷 The element of the Jia Zi (Na Yin) or 
            Sound of the elements
    🔷 The 60 Jia Zi
    🔷 The 24 mountains in Chinese, PinYin & 
            English
    🔷 Colour coding for each of the 24 
            mountains as per the element of their 
            frame
    🔷 The 8 Trigrams
      `,
      imageSource: require('../assets/images/amit3.png'),
    },
    {
      name: 'Sherry Merchants English SMartLuoPan® Transparent version',
      description: `This is the complete original face of our physical SMartLuoPan® without the background so you can view the GPS location below it.

You should follow the e-guide to get the full value and usage of each ring of this exhaustive SMartLuoPan®, it is like an intermediate fs course in itself.`,
      imageSource: require('../assets/images/kigi.png'),
    },

    {
      name: 'Annual Ring 2023',
      description: `Use this to determine the various impacts of energies for each direction in the current year (2023)
      `,
      imageSource: require('../assets/images/2023.png'),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[0].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(30),
                  height: responsiveWidth(30),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
                  {options[0].name}
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
                  {options[0].description}
                </Text>
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[1].imageSource}
                style={{
                  width: responsiveWidth(37),
                  height: responsiveWidth(37),
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
                  {options[1].name}
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
                  {options[1].description}
                </Text>
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[3].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(30),
                  height: responsiveWidth(30),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[4].imageSource}
                style={{
                  width: responsiveWidth(37),
                  height: responsiveWidth(37),
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
                  {options[4].name}
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(3),
              }}>
              <Image
                source={options[2].imageSource}
                style={{
                  flex: 1,
                  width: responsiveWidth(30),
                  height: responsiveWidth(30),
                  resizeMode: 'contain',
                }}
              />

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
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
              colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(30),
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

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    fontWeight: '600',
                    color: '#000',
                    marginTop: responsiveHeight(1.5),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}>
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
