import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CompassHeading from 'react-native-compass-heading'; // Use only CompassHeading
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Marker} from 'react-native-maps'; // Import MapView from react-native-maps
import Geocoding from 'react-native-geocoding';

const CompassOverlay = ({route}) => {
  const {option} = route.params;
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const [longitude, setLongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [qiblad, setQiblad] = useState(0);
  const [showMap, setShowMap] = useState(false); // State variable to toggle between compass and map views
  const [locationName, setLocationName] = useState('');
  Geocoding.init('AIzaSyC8US8kyT5h4eZIjWxBWuCDqLB2WOWenb4');

  useEffect(() => {
    const degree_update_rate = 1;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
      console.log('CompassHeading: ', heading, accuracy);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const calculate = (latitude, longitude) => {
    const PI = Math.PI;
    const latk = (21.4225 * PI) / 180.0;
    const longk = (39.8264 * PI) / 180.0;
    const phi = (latitude * PI) / 180.0;
    const lambda = (longitude * PI) / 180.0;
    const qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    setQiblad(qiblad);
  };

  const getLocation = async () => {
    const locationPermission = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (locationPermission === RESULTS.GRANTED) {
      // Location permission is granted, proceed to get the location
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setlatitude(latitude);
          setLongitude(longitude);
          console.log(latitude, longitude, 'latitude and longitude');
          calculate(latitude, longitude);
        },
        error => {
          console.error(error.code, error.message, 'error');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      // Location permission is not granted, request it
      const permissionResult = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionResult === RESULTS.GRANTED) {
        // Permission granted, proceed to get the location
        getLocation();
      } else {
        // Permission denied, handle accordingly
        console.log('Location permission denied.');
      }
    }
  };

  // location Name

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await Geocoding.from({latitude, longitude});
      const addressComponent = response.results[5].formatted_address;
      const locationName = addressComponent; // Adjust this based on the desired address component
      setLocationName(locationName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocationName(latitude, longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    getLocation();
  }, []);

  const getCardinalDirection = heading => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const degreePerDirection = 360 / directions.length;
    heading = (heading + 360) % 360;
    const index =
      Math.floor((heading + degreePerDirection / 2) / degreePerDirection) % 8;
    return directions[index];
  };

  const imageRotation = `${360 - compassHeading}deg`;

  return (
    <View style={styles.container}>
      {showMap ? (
        <>
          <MapView
            style={[styles.map]}
            region={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType={isSatelliteView ? 'satellite' : 'standard'}>
            <Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
            />
          </MapView>
          <View
            style={{
              position: 'absolute',
              top: responsiveHeight(3),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#000',
                  paddingHorizontal: responsiveWidth(4),
                  paddingVertical: responsiveWidth(2),
                  borderRadius: responsiveWidth(2),
                  padding: responsiveWidth(2),
                  borderColor: 'red',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: '600',
                    textAlign: 'center',
                    // paddingBottom: responsiveHeight(2),
                  }}>
                  {`${compassHeading}° ${getCardinalDirection(compassHeading)}`}
                </Text>
              </View>

              <Image
                source={require('../assets/images/direction.png')}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(5),
                  marginTop: responsiveHeight(1),
                  resizeMode: 'contain',
                }}
              />

              <Image
                source={option.imageSource}
                style={{
                  position: 'absolute',
                  top: responsiveHeight(7),
                  width: responsiveWidth(85),
                  height: responsiveHeight(50),
                  resizeMode: 'contain',
                  transform: [{rotate: imageRotation}], // Rotate the image
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#000080', '#000080']}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'orange',
                  width: responsiveWidth(70),

                  paddingVertical: responsiveHeight(2),
                  borderRadius: responsiveWidth(1),
                  marginTop: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(1.6),
                    fontWeight: '600',
                    paddingHorizontal: responsiveWidth(8),
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginBottom: responsiveHeight(1),
                  }}>
                  {locationName}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '500',
                  }}>
                  {latitude} {} {longitude}
                </Text>
              </LinearGradient>
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              // marginTop: responsiveHeight(1),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  paddingHorizontal: responsiveWidth(4),
                  paddingVertical: responsiveWidth(2),
                  borderRadius: responsiveWidth(2),
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: responsiveHeight(1),
                  marginTop: responsiveHeight(1),
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {`${compassHeading}° ${getCardinalDirection(compassHeading)}`}
                </Text>
              </View>
              <Image
                source={require('../assets/images/direction.png')}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(5),
                  resizeMode: 'contain',
                }}
              />
            </View>

            {/* flex 1st */}

            <View style={{flex: 1}}>
              {/* image show karane par size increase */}
              {showMap ? (
                <>
                  <Image
                    source={option.imageSource}
                    style={{
                      flex: 1,
                      width: responsiveWidth(100),
                      height: responsiveWidth(100),
                      resizeMode: 'contain',
                      transform: [{rotate: imageRotation}], // Rotate the image
                      alignSelf: 'center',
                    }}
                  />
                </>
              ) : (
                <Image
                  source={option.imageSource}
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                    transform: [{rotate: imageRotation}], // Rotate the image
                    alignSelf: 'contain',
                  }}
                />
              )}
            </View>

            {/* <View
              style={{
                backgroundColor: 'black',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveWidth(2),
                borderRadius: responsiveWidth(20),
                borderColor: 'red',
                borderWidth: 2,
                marginTop: responsiveHeight(13),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
             
                {`${compassHeading}° ${getCardinalDirection(compassHeading)}`}
              </Text>
            </View> */}
            {/* <Image
              source={require('../assets/images/direction.png')}
              style={{
                width: responsiveWidth(20),
                height: responsiveHeight(5),
                resizeMode: 'contain',
              }}
            /> */}

            {/* <Image
            source={option.imageSource}
            style={{
              width: responsiveWidth(85),
              height: responsiveHeight(40),
              resizeMode: 'contain',
              transform: [{rotate: imageRotation}], // Rotate the image
            }}
          /> */}

            {/* Location information */}
            {/* <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#A69EEC', '#EBBFD8']}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'orange',
                  width: responsiveWidth(50),
                  height: responsiveHeight(5),
                  borderRadius: responsiveWidth(50),
                  marginTop: responsiveHeight(3),
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '500',
                  }}>
                  {latitude} {longitude}
                </Text>
              </LinearGradient>

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: '500',
                  paddingHorizontal: responsiveWidth(20),
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: responsiveHeight(1),
                }}>
                {locationName}
              </Text>
            </View>
          </View> */}

            {/* content */}

            {/* <View
            style={{
              paddingHorizontal: responsiveWidth(8),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: '600',
                color: '#000',
                marginTop: responsiveHeight(2),
              }}>
              {option.name}
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '400',
                color: '#BDBDBD',
                marginTop: responsiveHeight(2),
                textAlign: 'center',
              }}>
              {option.description}
            </Text>
          </View> */}
          </View>
          {/* main view end here */}
        </>
      )}

      {/* Add your compass overlay content here */}

      <TouchableOpacity
        onPress={() => setShowMap(!showMap)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: responsiveWidth(1.1),
          borderRadius: responsiveWidth(10),
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'dashed',
        }}>
        {showMap ? (
          <Image
            source={require('../assets/images/compass.png')}
            style={{
              width: responsiveWidth(10),
              height: responsiveWidth(10),
            }}
          />
        ) : (
          <Image
            source={require('../assets/images/map.png')}
            style={{
              width: responsiveWidth(10),
              height: responsiveWidth(10),
            }}
          />
        )}
      </TouchableOpacity>
      {showMap ? (
        <TouchableOpacity
          onPress={() => setIsSatelliteView(!isSatelliteView)}
          style={{
            position: 'absolute',
            top: responsiveHeight(11),
            left: responsiveWidth(82),
          }}>
          {isSatelliteView ? (
            <Image
              source={require('../assets/images/orbit.png')}
              resizeMode="contain"
              style={{
                width: responsiveWidth(13),
                height: responsiveWidth(13),
              }}
            />
          ) : (
            <Image
              source={require('../assets/images/orbit.png')}
              resizeMode="contain"
              style={{
                width: responsiveWidth(13),
                height: responsiveWidth(13),
              }}
            />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CompassOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
