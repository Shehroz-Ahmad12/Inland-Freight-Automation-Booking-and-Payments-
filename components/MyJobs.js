
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

export default function MyJobs ({ navigation }){
    const [bookingData, setBookingData] = React.useState({});
  
    const getBookingsData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings.json`);
      const data = await response.json();
      var id=Object.keys(data);
      var pendingData={};
      console.log(id);
      for (let i=0;i<id.length;i++){
          let key=id[i];
          console.log(data[key].Status);
            if(data[key].Status==="In-Process"){
                pendingData[key]=data[key];
            }
    }
    console.log(pendingData);
      setBookingData(pendingData);
    //   console.log(data);
      
    };
  
    React.useEffect(() => {
      getBookingsData();
    }, [setBookingData]);
  
  
    return(
      <View>
        <FlatList
            refreshing={false}
            onRefresh={getBookingsData}
            keyExtractor={(item, index) => index}
            data={Object.keys(bookingData)}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{padding: 15, borderBottomColor:'grey', borderBottomWidth:1}} onPress={()=>{navigation.navigate('Booking Details', item)}}>
                <View style={{flexDirection: 'row'}}>
                <Text>{bookingData[item].DateTime.toString()}</Text>  
                <Text style={{marginTop: 5, fontSize: 20, marginLeft: 100}}>{bookingData[item].Offer} Rs</Text>
                </View>
                <Text>Source: {bookingData[item].PickupCity}, {bookingData[item].PickUpAddress}</Text>
                <Text>Destination: {bookingData[item].DropoffCity}, {bookingData[item].DropoffAddress}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
    )
  }