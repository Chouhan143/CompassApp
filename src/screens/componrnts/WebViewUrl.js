import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewUrl = () => {
  const ccAvenuePaymentURL =
    'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

  return (
    <View style={styles.container}>
      <WebView source={{uri: ccAvenuePaymentURL}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewUrl;
