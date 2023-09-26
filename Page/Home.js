import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import img_logo from '../assets/edba.png';

const { height, width } = Dimensions.get('window');



const Home = ({ navigation }) => {
  const [selectedBus, setSelectedBus] = useState("Select the Bus");

 


  const startTracking = () => {
    navigation.navigate("Map",{
      selectedBus:selectedBus
    });
  };



  return (
    <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
      <View style={{ height, width, borderRadius: 10, padding: 10, marginTop: 18, flex: 1 }}>
        <View style={styles.head_logo}>
          <Image source={img_logo} style={styles.img_logo} resizeMode="contain" />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 3, borderRadius: 5 }}>
          <View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 16, marginRight: 175 }}>
                Bus No:
              </Text>
              <Picker
                selectedValue={selectedBus}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedBus(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Select the Bus" value="Select the Bus" />
                <Picker.Item label="Bus 1" value="bus1" />
                <Picker.Item label="Bus 2" value="bus2" />
                <Picker.Item label="Bus 3" value="bus3" />
              </Picker>
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={startTracking}
                >
                  <Text style={styles.buttonText}>Start Tracking</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    height: '7%',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  img_logo: {
    height: '100%',
    width: '100%',
  },
  picker: {
    width: 250,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    ...Platform.select({
      android: {
        backgroundColor: "transparent",
        borderRadius: 10,
      },
    }),
  },
  buttonContainer: {
    backgroundColor: "#FF7F50",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default Home;
