import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('sunilchouhan773@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [lastTransaction, setLastTransaction] = useState('');
  //Login Api here

  const LoginApi = async () => {
    try {
      const Url = 'https://app.srninfotech.com/compass/api/login';
      const Payload = {
        email: email,
        password: password,
      };

      const response = await axios.post(Url, Payload);
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const username = response.data.Name;
        const lastTransaction = response.data.last_transaction_status;
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('Name', username);
        setLastTransaction(lastTransaction);
        checkSubscriptionStatus();
      }
      console.log(response.data, 'response');
    } catch (error) {
      console.log('error', error);
    }
  };

  // const checkSubscriptionStatus = async () => {
  //   const hasSubscription = await AsyncStorage.getItem('Subscription');
  //   if (hasSubscription === 'true') {
  //     // User has an active subscription, navigate to the main screen
  //     navigation.navigate('Home');
  //     console.log('if part run');
  //   } else {
  //     navigation.navigate('ModalComponent');
  //     console.log('else part run');
  //     // User does not have a subscription, show the subscription modal or take other actions
  //     // You can display a subscription button or show the modal here.
  //   }
  // };

  const checkSubscriptionStatus = async () => {
    if (lastTransaction === 'No Transaction Found') {
      // lastTransaction is an empty array, navigate to the ModalComponent screen
      navigation.navigate('ModalComponent');
      console.log('Navigating to ModalComponent');
    } else if (lastTransaction === 'Transaction is still valid') {
      // lastTransaction has data, navigate to the Home screen
      navigation.navigate('Home');
      console.log('Navigating to Home');
    } else if (lastTransaction === 'Transaction has expired') {
      navigation.navigate('ModalComponent');
    }
  };

  // useEffect(() => {
  //   checkSubscriptionStatus();
  // }, []);

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
            onPress={LoginApi}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color: '#000',
              }}>
              Login
            </Text>
          </TouchableOpacity>

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
              account Create first ? {}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                  color: 'blue',
                  justifyContent: 'flex-end',
                }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;
