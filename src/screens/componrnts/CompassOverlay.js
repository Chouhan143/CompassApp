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
import Pinchable from 'react-native-pinchable';
import LinearGradient from 'react-native-linear-gradient';
import CompassHeading from 'react-native-compass-heading'; // Use only CompassHeading
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Marker} from 'react-native-maps'; // Import MapView from react-native-maps
import Geocoding from 'react-native-geocoding';
import ImageZoom from 'react-native-image-pan-zoom';
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
      if (response.results && response.results.length > 0) {
        const addressComponent = response.results[0].formatted_address; // Adjust the index based on your requirements
        const locationName = addressComponent;
        setLocationName(locationName);
      } else {
        console.error('No results found in geocoding response.');
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
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

  const imageRotation = `${181 - compassHeading}deg`;

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
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: responsiveHeight(2),
                  zIndex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: '#000',
                    paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveWidth(2),
                    borderRadius: responsiveWidth(2),
                    padding: responsiveWidth(2),
                    borderColor: 'red',
                    borderWidth: 1,
                    marginTop: responsiveHeight(10),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: responsiveFontSize(2.3),
                      fontWeight: '600',
                      textAlign: 'center',
                      // paddingBottom: responsiveHeight(2),
                    }}>
                    {`${compassHeading}° ${getCardinalDirection(
                      compassHeading,
                    )}`}
                  </Text>
                </View>

                <Image
                  source={require('../assets/images/UpArrow.png')}
                  style={{
                    width: responsiveWidth(12),
                    height: responsiveWidth(12),
                    // marginTop: responsiveHeight(14.5),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Image
                source={option.imageSource2}
                style={{
                  position: 'absolute',
                  top: responsiveHeight(15),
                  width: responsiveWidth(100),
                  height: responsiveWidth(100),
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
              backgroundColor: '#eaf4fc',
            }}>
            {/* flex 1st bina map  wala  */}

            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingTop: responsiveHeight(35),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: responsiveHeight(29),
                    zIndex: 1,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: responsiveWidth(4),
                      paddingVertical: responsiveWidth(2),
                      borderRadius: responsiveWidth(2),
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginBottom: responsiveHeight(2),
                      // marginTop: responsiveHeight(1),
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      {`${compassHeading}° ${getCardinalDirection(
                        compassHeading,
                      )}`}
                    </Text>
                  </View>

                  <Image
                    source={require('../assets/images/UpArrow.png')}
                    style={{
                      width: responsiveWidth(12),
                      height: responsiveWidth(12),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
              <View>
                {/* image show karane par size increase */}
                {showMap ? (
                  <>
                    <ImageZoom
                      cropWidth={responsiveWidth(100)}
                      cropHeight={responsiveHeight(100)}
                      imageWidth={responsiveWidth(100)}
                      imageHeight={responsiveHeight(100)}>
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
                    </ImageZoom>
                  </>
                ) : (
                  <ImageZoom
                    cropWidth={responsiveWidth(100)}
                    cropHeight={responsiveHeight(100)}
                    imageWidth={responsiveWidth(100)}
                    imageHeight={responsiveHeight(100)}>
                    <Image
                      source={option.imageSource2}
                      // source={require('../assets/images/Basic_black.png')}
                      style={{
                        flex: 1,
                        width: responsiveWidth(100),
                        height: responsiveWidth(100),
                        resizeMode: 'contain',
                        transform: [{rotate: imageRotation}], // Rotate the image
                        alignSelf: 'center',
                      }}
                    />
                  </ImageZoom>
                )}
              </View>
            </View>
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
    backgroundColor: '#000080',
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
