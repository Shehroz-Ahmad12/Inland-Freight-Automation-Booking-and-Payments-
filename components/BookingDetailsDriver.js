import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView, FlatList, Alert
} from 'react-native';
import Constants from 'expo-constants';
import { CheckBox, Icon, Input, ButtonGroup } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function BookingDetailsDriver({navigation, route}){
   
    const id= route.params;
   
    const [bookingData, setBookingData]= React.useState({});
    const{PickUpAddress, DropoffAddress, PickupCity, DropoffCity, Vehicle, Offer, Weight, DateTime }=bookingData;
    
    const getBookingsData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
      const data = await response.json();
      setBookingData(data);
      console.log(data);
    };

    const completeJob = ()=>{
        const id = route.params;
        var data= bookingData;
        data["Status"]="Completed";
        var requestOptions = {
          method: 'PATCH',
          body: JSON.stringify(data),
        };
    
        fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log('error', error));
    }
  

    
  
    React.useEffect(() => {
      getBookingsData();
    }, [setBookingData]);
  
    return(
        <View>
          <View>
            <Text style={{fontSize: 40, marginTop:20, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10}}>{Offer} Rs</Text>
                <Text style={{fontSize: 15, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10}}>{DateTime}</Text>
                <Text style={{fontSize: 20, padding: 5, marginLeft: 15, marginTop:20}}>Source: {PickupCity}, {PickUpAddress}</Text>
                <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Destination: {DropoffCity}, {DropoffAddress}</Text>
                <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Vehicle Type: {Vehicle}</Text>
                <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Weight: {Weight} kg</Text>
                <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Driver Details: </Text>
                </View>
                <TouchableOpacity onPress={()=>{Alert.alert(
              'Complete Job',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => {completeJob(); }}
              ]
            )}} style={{marginTop:20 , padding:10 , backgroundColor: "#0B9F72", width: 200 ,alignSelf:'center',borderRadius: 5}}><Text style={{alignSelf: 'center', color: "white"}}>Complete Job</Text></TouchableOpacity>
          </View>
    )
  }
  