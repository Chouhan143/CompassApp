import React from 'react';
import {View, Text, Modal, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SuccessModal = ({visible, closeModal}) => {
  const navigation = useNavigation();
  const handleOkPress = () => {
    // Close the modal
    closeModal();
    // Navigate to the home screen
    navigation.navigate('Home'); // Adjust the screen name as needed
  };

  return (
    <Modal
      visible={visible}
      transparent={true} // Set transparent to make the background transparent
      animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: 'green',
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Payment Successful done!
          </Text>
          <Button
            style={{
              fontSize: responsiveFontSize(2.5),
              color: 'green',
              fontWeight: '500',
            }}
            title="Ok"
            onPress={handleOkPress}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background with 0.5 opacity
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    justifyContent: 'center',
  },
});

export default SuccessModal;
