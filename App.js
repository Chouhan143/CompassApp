import * as React from 'react';
import 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MainScreen from './src/screens/componrnts/MainScreen';
import CompassOverlay from './src/screens/componrnts/CompassOverlay';
import {PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './src/screens/componrnts/HomeScreen';
import CheckoutPage from './src/screens/componrnts/CheckoutPage';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSideMenu from './src/screens/componrnts/CustomSideMenu';
import Login from './src/screens/LoginSignUp/Login';
import SignUp from './src/screens/LoginSignUp/SignUp';
import ModalComponent from './src/screens/componrnts/ModalComponent';
import PaymentScreen from './src/screens/componrnts/PaymentScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
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
    const navigation = useNavigation();

    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#000080', '#000080']}
        style={{
          padding: responsiveWidth(3),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name="arrowleft"
          size={responsiveFontSize(3)}
          color="#fff"
          style={{marginLeft: responsiveWidth(3)}}
          onPress={() => navigation.navigate('Home')}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: responsiveFontSize(2.5),
            fontWeight: '700',
            paddingLeft: responsiveWidth(3),
          }}>
          Compass Overlay
        </Text>
      </LinearGradient>
    );
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      // console.log('token exiting app', token);
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status: ', error);
    }
  };

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={publishableKey}>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Screen name="DrawerScreen" options={{headerShown: false}}>
              {() => (
                <Drawer.Navigator
                  initialRouteName="Home"
                  drawerContent={props => <CustomSideMenu {...props} />}>
                  <Drawer.Screen
                    name="Home"
                    component={MainScreen}
                    options={{
                      title: 'Compass',
                      headerStyle: {
                        backgroundColor: '#000080',
                      },
                      headerTitleStyle: {
                        alignSelf: 'center',
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: '700',
                      },
                      headerTintColor: 'white',
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
                    name="CompassOverlay"
                    component={CompassOverlay}
                    options={{
                      header: () => <GradientHeader2 />,
                      headerTitleStyle: {alignSelf: 'center'},
                      headerTintColor: 'white',
                    }}
                  />
                </Drawer.Navigator>
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>

        {/* <Stack.Navigator>
          {loggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={MainScreen}
                options={{
                  title: 'Compass',
                  headerStyle: {
                    backgroundColor: '#000080',
                  },
                  headerTitleStyle: {
                    alignSelf: 'center',
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '700',
                  },
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="ModalComponent"
                component={ModalComponent}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="CompassOverlay"
                component={CompassOverlay}
                options={{
                  header: () => <GradientHeader2 />,
                  headerTitleStyle: {alignSelf: 'center'},
                  headerTintColor: 'white',
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator> */}
      </StripeProvider>
    </NavigationContainer>
  );
}

export default App;
