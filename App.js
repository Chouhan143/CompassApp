// In App.js in a new project

import * as React from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/componrnts/MainScreen';
import CompassOverlay from './src/screens/componrnts/CompassOverlay';
import {PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'; // Replace with the appropriate icon library
// import SplaceScreen from './src/screens/SplaceScreen/SplaceScreen';
import HomeScreen from './src/screens/componrnts/HomeScreen';
import CheckoutPage from './src/screens/componrnts/CheckoutPage';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
// import Compass from './src/screens/Compass';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSideMenu from './src/screens/componrnts/CustomSideMenu';
import Login from './src/screens/LoginSignUp/Login';
import SignUp from './src/screens/LoginSignUp/SignUp';
import ModalComponent from './src/screens/componrnts/ModalComponent';
import PaymentScreen from './src/screens/componrnts/PaymentScreen';
import WebViewUrl from './src/screens/componrnts/WebViewUrl';
import {StripeProvider} from '@stripe/stripe-react-native';
// const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function App() {
    // const publishableKey =
      // 'pk_test_51O0NEfSCYfvSqN8a5J7loVdluHTBBKI883vRBmpEe8W3uLLZKYTQ08yBCfgMW5d0dJFl8fSQmLhz8SagZGCaMLwA00HNNiu8CK';
    const publishableKey =
      'pk_test_51O1ruqGeHhuFbcStdbNBd4c8Nv1didmZ5pSfSqEIxOuAmVm6YYbI9ZqFDB7eEtXgbOW7aG5XFm7kH22xBNgasrcF00zsIMzz6f';

  const GradientHeader = () => (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#A69EEC', '#EBBFD8']}
      style={{
        padding: responsiveWidth(3),
      }}>
      <Text
        style={{
          color: '#000',
          fontSize: responsiveFontSize(2.5),
          fontWeight: '700',
        }}>
        Compass
      </Text>
    </LinearGradient>
  );

  const GradientHeader2 = () => {
    const navigation = useNavigation(); // Use useNavigation hook to access navigation

    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#A69EEC', '#EBBFD8']}
        style={{
          padding: responsiveWidth(3),
          // justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name="arrowleft"
          size={responsiveFontSize(3)}
          color="#000"
          style={{marginLeft: responsiveWidth(3)}}
          onPress={() => navigation.navigate('Home')}
        />
        <Text
          style={{
            color: '#000',
            fontSize: responsiveFontSize(2.5),
            fontWeight: '700',
            paddingLeft: responsiveWidth(3),
          }}>
          Compass Overlay
        </Text>
      </LinearGradient>
    );
  };

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={publishableKey}>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          drawerContent={props => <CustomSideMenu {...props} />}>
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="CheckoutPage"
            component={CheckoutPage}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="ModalComponent"
            component={ModalComponent}
            options={{
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="WebViewUrl"
            component={WebViewUrl}
            options={{
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="Home"
            component={MainScreen}
            options={{
              title: 'Compass', // Set a default title for the screen
              headerStyle: {
                backgroundColor: '#000', // Set the header background color to red
              },
              headerTitleStyle: {
                alignSelf: 'center', // Center the header title
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
              },
              headerTintColor: 'white', // Set the header text color to white
            }}
          />
          <Drawer.Screen
            name="CompassOverlay"
            component={CompassOverlay}
            options={{
              header: () => <GradientHeader2 />, // Set the custom gradient header component
              headerTitleStyle: {alignSelf: 'center'},
              headerTintColor: 'white',
            }}
          />
        </Drawer.Navigator>
      </StripeProvider>
    </NavigationContainer>
  );
}

export default App;
