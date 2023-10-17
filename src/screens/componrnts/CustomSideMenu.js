import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import Icon3 from 'react-native-vector-icons/FontAwesome6Brands';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSideMenu = () => {
  const [selectedId, setSelectedId] = useState(null);
  const Home = <Icon name="home" size={20} color="#000" />;
  const Compass = <Icon2 name="direction" size={20} color="#000" />;
  const [userName, setUserName] = useState('');
  const Profile = <Icon name="profile" size={20} color="#000" />;
  const Subscroptions = <Icon4 name="subscriptions" size={20} color="#000" />;
  const Share = <Icon name="sharealt" size={20} color="#000" />;
  const Logout = <Icon4 name="logout" size={20} color="#000" />;

  const listArray = [
    {icon: Home, title: 'Home', screenName: 'Home'},

    // {icon: Profile, title: 'Profile', screenName: 'Home'},
    {
      icon: Subscroptions,
      title: 'Subscroptions',
      screenName: 'SubscriptionScreen',
    },
    // {icon: myIcon, title: 'Other'},
  ];
  const BottomList = [
    // {icon: Share, title: 'Share'},
    {icon: Logout, title: 'Logout', screenName: 'HomeScreen'},
  ];

  const Item = ({icon, title, onPress, backgroundColor, color, screenName}) => {
    const navigation = useNavigation();

    // const handleLogout = () => {
    //   // Show a confirmation dialog before logging out
    //   Alert.alert(
    //     'Logout Confirmation',
    //     'Are you sure you want to logout?',
    //     [
    //       {
    //         text: 'Cancel',
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'Logout',
    //         onPress: async () => {
    //           // Clear user data and navigate to the logout screen
    //           await AsyncStorage.clear(); // Clear all data stored in AsyncStorage
    //           navigation.navigate('LogoutScreen'); // Navigate to your logout screen
    //         },
    //       },
    //     ],
    //     {cancelable: false}, // Prevent dismissing the dialog by tapping outside of it
    //   );
    // };

    useEffect(() => {
      async function fetchUserName() {
        const storedUserName = await AsyncStorage.getItem('Name');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      }
      fetchUserName();
    }, []);

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: responsiveWidth(5),
          // marginBottom: responsiveHeight(2),
          borderBottomColor: '#A69EEC',
          borderWidth: 0.5,
          width: responsiveWidth(100),
          height: responsiveHeight(6.7),
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}
        onPress={() => {
          navigation.navigate(screenName); // Navigate to the specified screen
          console.log(screenName);
          onPress();
        }}>
        <Text>{icon}</Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontWeight: '700',
            color: color,
            paddingLeft: responsiveWidth(5),
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.title === selectedId ? '#A69EEC' : '#ffff';
    const color = item.title === selectedId ? '#fff' : '#000';

    return (
      <View>
        <Item
          title={item.title}
          icon={item.icon}
          onPress={() => setSelectedId(item.title)}
          backgroundColor={backgroundColor}
          color={color}
          screenName={item.screenName}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3}}>
        <ImageBackground
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          source={require('../assets/images/blurryBackground.jpg')}>
          <Image
            source={require('../assets/images/user3.png')}
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              position: 'absolute',
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: '800',
              color: 'white',
              paddingTop: responsiveHeight(15),
            }}>
            Hello !
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: '600',
              color: 'white',
              //   paddingTop: responsiveHeight(15),
            }}>
            Mr. {userName}
          </Text>
        </ImageBackground>
      </View>
      <View style={{flex: 0.7, backgroundColor: '#fff'}}>
        <FlatList data={listArray} renderItem={renderItem} />
      </View>
      <View style={{flex: 0.2}}>
        <FlatList data={BottomList} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({});
