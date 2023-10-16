import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useStripe, useConfirmPayment} from '@stripe/stripe-react-native';

import {CardField, createToken} from '@stripe/stripe-react-native';
import createPaymentIntent from './stripeApis';
import ButtonComp from './ButtonComp';
const PaymentScreen = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [code, setCode] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const {createPaymentMethod} = useStripe();
  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayment = async () => {
    try {
      const cardDetails = {
        number: cardNumber.replace(/\s/g, ''), // Remove spaces
        expMonth: exp.split('/')[0],
        expYear: exp.split('/')[1],
        cvc: code,
      };

      console.log('dhfh', cardDetails);
      // Create a PaymentMethod
      const {paymentMethod, error} = await createPaymentMethod({
        type: 'Card',
        card: cardDetails,
      });

      if (error) {
        console.error(error);
        return; // Handle the error
      }

      const token = await AsyncStorage.getItem('access_token');
      // Send the payment method to your API for processing
      const response = await fetch(
        'https://app.srninfotech.com/compass/api/check-out',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({paymentMethodId: paymentMethod.id}),
        },
      );

      if (response.ok) {
        // Payment successful
        // You can show a success modal or navigate to the success screen here
      } else {
        // Handle API response errors
        console.error('Payment failed:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  // const ondone = async () => {
  //   const rest = await createToken({...cardInfo, type: 'Card'});
  //   console.log('dsdfdsf', rest);
  // };

  const ondone = async () => {
    let apiData = {
      amount: 2500,
      currency: 'usd',
    };

    try {
      const res = await createPaymentIntent(apiData);
      console.log('payment intent create succesfully...!!!', res);
      console.log('payment pls aajja', res.paymentIntent);

      if (res?.paymentIntentClient?.client_secret) {
        let confirmPaymentIntent = await confirmPayment(
          res?.paymentIntentClient?.client_secret,
          {
            paymentMethodType: 'Card',
          },
        );
        console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
        alert('Payment succesfully...!!!');
      }
    } catch (error) {
      console.log('Error rasied during payment intent', error);
    }
  };

  return (
    // <View style={{flex: 1, backgroundColor: '#fff'}}>
    //   <View style={{marginHorizontal: 20, marginVertical: 40}}>
    //     <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
    //       Payment details
    //     </Text>
    //   </View>
    //   <TextInput
    //     label="User Name"
    //     value={name}
    //     onChangeText={text => setName(text)}
    //     mode="outlined"
    //     style={{marginHorizontal: 20, marginVertical: 10}}
    //   />
    //   <TextInput
    //     label="Card Number"
    //     value={cardNumber}
    //     onChangeText={text => setCardNumber(text)}
    //     mode="outlined"
    //     style={{marginHorizontal: 20, marginVertical: 10}}
    //   />
    //   <TextInput
    //     label="MM/YY"
    //     value={exp}
    //     onChangeText={text => setExp(text)}
    //     mode="outlined"
    //     style={{marginHorizontal: 20, marginVertical: 10}}
    //   />
    //   <TextInput
    //     label="CVC"
    //     value={code}
    //     onChangeText={text => setCode(text)}
    //     mode="outlined"
    //     style={{marginHorizontal: 20, marginVertical: 10}}
    //   />
    //   <TouchableOpacity
    //     style={{
    //       width: '90%',
    //       height: 50,
    //       backgroundColor: 'blue',
    //       alignSelf: 'center',
    //       marginVertical: 20,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //     onPress={handlePayment}>
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         fontWeight: '800',
    //         color: '#fff',
    //       }}>
    //       PAY
    //     </Text>
    //   </TouchableOpacity>
    // </View>
    <View style={{padding: 16}}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          fetchCardDetail(cardDetails);
          console.log(cardDetails, 'cardDetails');
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />

      {/* <ButtonComp onPress={onDone} disabled={!cardInfo} />

      <ButtonComp
        onPress={onPressPaypal}
        disabled={false}
        btnStyle={{backgroundColor: '#0f4fa3', marginVertical: 16}}
        text="PayPal"
        isLoading={isLoading}
      /> */}

      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'blue',
          alignSelf: 'center',
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={ondone}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: '#fff',
          }}>
          PAY
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
