// PaymentScreen.js

import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {TextInput} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useRoute} from '@react-navigation/native';
import SuccessModal from './SuccessModal';
import {useStripe} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PaymentScreen = () => {
  const route = useRoute();
  const {amount} = route.params;
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [code, setCode] = useState('');

  // SuccesModal UI  manage
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handlePayment = () => {
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };
  // cancellModal UI  manage

  // Api call here

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const API_URL = 'https://app.srninfotech.com/compass/api/check-out';

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginHorizontal: responsiveWidth(4),
          marginVertical: responsiveWidth(10),
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            fontWeight: 'bold',
            color: 'black',
          }}>
          Payment details
        </Text>
        <Image
          source={require('../assets/images/card.png')}
          style={{
            width: responsiveWidth(60),
            height: responsiveWidth(60),
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          marginHorizontal: responsiveWidth(5),
        }}>
        <TextInput
          label="User Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
        />
        <TextInput
          label="Card Number"
          value={cardNumber}
          onChangeText={text => setCardNumber(text)}
          mode="outlined"
          style={{
            marginTop: responsiveHeight(2),
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: responsiveWidth(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          label="MM/YY"
          value={exp}
          onChangeText={text => setExp(text)}
          mode="outlined"
          style={{width: responsiveWidth(40), marginTop: responsiveHeight(2)}}
        />
        <TextInput
          label="CVC"
          value={code}
          onChangeText={text => setCode(text)}
          mode="outlined"
          style={{
            marginTop: responsiveHeight(2),
            width: responsiveWidth(40),
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(6),
          borderRadius: responsiveWidth(1),
          backgroundColor: 'blue',
          alignSelf: 'center',
          marginTop: responsiveHeight(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handlePayment}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: responsiveFontSize(2),
            fontWeight: '800',
            color: '#fff',
            alignSelf: 'center',
          }}>
          PAY ${amount}
        </Text>
      </TouchableOpacity>
      <SuccessModal visible={showSuccessModal} closeModal={closeModal} />
    </View>
  );
};

export default PaymentScreen;
