import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import axios from "axios";
import img_logo from "../assets/edba.png";
const { height, width } = Dimensions.get("window");

const Map = (props) => {
  const { selectedBus } = props.route.params;
  const mapRef = useRef();
  const markerRef = useRef();
  const [locationData, setLocationData] = useState({
    latitude: 19.4177,
    longitude: 72.8189,
  });

 

  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  // url=https://3000-vexalite-location-mavvffhyvkl.ws-us104.gitpod.io/api/user/x

  const fetchLiveLocation = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://loc-j3bu.onrender.com/api/user/${selectedBus}`
      );
      let location = response.data[response.data.length - 1];
      console.log("location----", location.data);
      console.log(
        `${location.data.latitude}---------${location.data.longitude}`
      );
      const { latitude, longitude } = location.data;

      setLocationData({ latitude, longitude });

      console.log(`${locationData.latitude}------${locationData.longitude}`);
    } catch (error) {
      console.error(error);
    }
  }, [locationData]);

  useEffect(() => {
    // Fetch live location when the component mounts
    fetchLiveLocation();
  }, [fetchLiveLocation]);

  const initialRegion = {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

 


  const coordinate = new AnimatedRegion({
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

const animate=(latitude,longitude)=>{
  const newCoordinate = { latitude, longitude };
  if (Platform.OS == 'android') {
      if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
  } else {
      coordinate.timing(newCoordinate).start();
  }
}

const onCenter = () => {
  mapRef.current.animateToRegion({
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  })
}


  return (
    <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
      <View
        style={{
          height,
          width,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          flex: 1,
        }}
      >
        <View style={styles.head_logo}>
          <Image
            source={img_logo}
            style={styles.img_logo}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 5,
          }}
        >
          <View>
            <View style={styles.container}>
              <MapView
                ref={mapRef}
                provider="google"
                followsUserLocation={true}
                initialRegion={initialRegion}
                style={styles.map}
                // zoomEnabled={true}
              >
                {/* Marker for user's location */}
                {locationData && (
                  <Marker.Animated
                  ref={markerRef}
                  coordinate={coordinate}
                    title="xyz"
                    description={selectedBus}
                  >
                    <Image
                      source={require("../assets/pngwing.com.png")}
                      style={{ height: 25, width: 25, borderRadius: 2 }}
                      resizeMode="cover"
                    />
                  </Marker.Animated>
                )}
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    height: "7%",
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  img_logo: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: 660,
    width: 334,
    borderRadius: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
