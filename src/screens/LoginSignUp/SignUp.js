import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const SignUpApi = async () => {
    try {
      const Url = 'https://app.srninfotech.com/compass/api/register';
      const Payload = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axios.post(Url, Payload);
      if (response.data.status === 201) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('error', error.response);
    }
  };

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#A69EEC', '#EBBFD8']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}>
        <Image
          source={require('../assets/images/Logo.jpeg')}
          style={{
            width: responsiveWidth(20),
            height: responsiveWidth(20),
            borderRadius: responsiveWidth(2),
          }}
        />

        <View style={{flex: 0.8, marginTop: responsiveHeight(12)}}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={text => setName(text)}
            style={{
              borderColor: '#fff',
              borderWidth: 2,
              width: responsiveWidth(75),
              height: responsiveHeight(6.5),
              borderRadius: responsiveWidth(50),
              paddingHorizontal: responsiveWidth(5),
              color: '#000',
              shadowColor: '#fff',
              elevation: 1,
            }}
          />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="gray"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              borderColor: '#fff',
              borderWidth: 2,
              width: responsiveWidth(75),
              height: responsiveHeight(6.5),
              borderRadius: responsiveWidth(50),
              paddingHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(2),
              color: '#000',
              shadowColor: '#fff',
              elevation: 1,
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={text => setPassword(text)}
            style={{
              borderColor: '#fff',
              borderWidth: 2,
              width: responsiveWidth(75),
              height: responsiveHeight(6.5),
              borderRadius: responsiveWidth(50),
              paddingHorizontal: responsiveWidth(5),
              shadowColor: '#fff',
              elevation: 1,
              marginTop: responsiveHeight(2),
            }}
          />

          <TouchableOpacity
            style={{
              borderColor: '#A69EEC',
              borderWidth: 2,
              width: responsiveWidth(75),
              height: responsiveHeight(6.5),
              borderRadius: responsiveWidth(50),
              paddingHorizontal: responsiveWidth(5),
              shadowColor: '#A69EEC',
              backgroundColor: '#fff',
              elevation: 5,
              marginTop: responsiveHeight(7),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={SignUpApi}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: '700',
                color: '#000',
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.2,
            marginTop: responsiveHeight(3),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: '500',
              color: 'black',
            }}>
            Do You Have Allready account ? {}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
                color: 'blue',
                justifyContent: 'flex-end',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
