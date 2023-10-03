// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
// import MapView, { Marker, AnimatedRegion } from "react-native-maps";
// import axios from "axios";
// import img_logo from "../assets/edba.png";
// const { height, width } = Dimensions.get("window");

// const Map = (props) => {
//   const { selectedBus } = props.route.params;
//   const mapRef = useRef();
//   const markerRef = useRef();
//   const [locationData, setLocationData] = useState({
//     latitude: 19.4177,
//     longitude: 72.8189,
//   });

//   const fetchLiveLocation = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `https://loc-j3bu.onrender.com/api/user/${selectedBus}`
//       );
//       let location = response.data[response.data.length - 1];
//       console.log("location----", location.data);
//       console.log(
//         `${location.data.latitude}---------${location.data.longitude}`
//       );
//       const { latitude, longitude } = location.data;

//       setLocationData({ latitude, longitude });

//       console.log(`${locationData.latitude}------${locationData.longitude}`);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [locationData]);

//   useEffect(() => {
//     // Fetch live location when the component mounts
//     fetchLiveLocation();
//   }, [fetchLiveLocation]);

//   const initialRegion = {
//     latitude: locationData.latitude,
//     longitude: locationData.longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
//       <View
//         style={{
//           height,
//           width,
//           borderRadius: 10,
//           padding: 10,
//           marginTop: 18,
//           flex: 1,
//         }}
//       >
//         <View style={styles.head_logo}>
//           <Image
//             source={img_logo}
//             style={styles.img_logo}
//             resizeMode="contain"
//           />
//         </View>
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "center",
//             borderColor: "black",
//             borderWidth: 3,
//             borderRadius: 5,
//           }}
//         >
//           <View>
//             <View style={styles.container}>
//               <MapView
//                 provider="google"
//                 followsUserLocation={true}
//                 initialRegion={initialRegion}
//                 style={styles.map}
//                 zoomEnabled={true}
//               >
//                 {/* Marker for user's location */}
//                 {locationData && (
//                   <Marker
//                     coordinate={{
//                       latitude: locationData.latitude,
//                       longitude: locationData.longitude,
//                     }}
//                     title="xyz"
//                     description={selectedBus}
//                   >
//                     <Image
//                       source={require("../assets/pngwing.com.png")}
//                       style={{ height: 25, width: 25, borderRadius: 2 }}
//                       resizeMode="cover"
//                     />
//                   </Marker>
//                 )}
//               </MapView>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   head_logo: {
//     height: "7%",
//     width: "30%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//   },
//   img_logo: {
//     height: "100%",
//     width: "100%",
//   },
//   container: {
//     height: 660,
//     width: 334,
//     borderRadius: 5,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default Map;




import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import axios from "axios";
import img_logo from "../assets/edba.png";
import greenIndicator from "../assets/greenIndicator.png";
import { mapStyle } from "./style/mapstyle";
const { height, width } = Dimensions.get("window");
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = (props) => {
  const { selectedBus } = props.route.params;
  const mapRef = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading:0
  });

  const { curLoc, coordinate, isLoading } = state;

  const fetchLiveLocation = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://loc-j3bu.onrender.com/api/user/${selectedBus}`
      );
      if (response.status === 200) {
        let location = response.data[response.data.length - 1];
        const { latitude, longitude } = location.data;
        const head=location.data.heading
        console.log("heading----",head)
        animate(latitude, longitude);
        updateState({
          curLoc: { latitude, longitude },
        });
      } else {
        console.error("API request failed with status code:", response.status);
        // Handle the error gracefully, e.g., show an error message to the user.
      }
    } catch (error) {
      console.error("API request failed with error:", error);
      // Handle the error gracefully, e.g., show an error message to the user.
    }
  }, [state]);
  

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    coordinate.timing(newCoordinate,4000).start();
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  useEffect(() => {
    fetchLiveLocation();
  }, [fetchLiveLocation]);

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
                // style={StyleSheet.absoluteFill}
                style={styles.map}
                // customMapStyle={mapStyle}
                initialRegion={{
                  ...curLoc,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
              >
                <Marker.Animated coordinate={coordinate}>
                  <Image
                    source={require("../assets/bus-svgrepo-com.png")}
                    style={{ height: 45, width: 45, borderRadius: 1}}
                    resizeMode="contain"
                  />
                </Marker.Animated>
              </MapView>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                onPress={onCenter}
              >
                <Image source={greenIndicator} />
              </TouchableOpacity>
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
  map:{
    height:"100%",
    width:"100%"
  },
  container: {
    height: 682,
    width: 357,
    borderRadius: 5,
    padding:0
  },
});

export default Map;
