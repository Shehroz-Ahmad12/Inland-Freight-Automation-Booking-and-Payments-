
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

export default function MyJobs ({ navigation, route }){
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
    };
  
    React.useEffect(() => {
      getBookingsData();
    }, [setBookingData]);
  
    React.useEffect(() => {
      navigation.addListener('focus', () => {
        getBookingsData();
      });

    }, [navigation]);
  
    return(
      <View>
        <FlatList
            refreshing={false}
            onRefresh={getBookingsData}
            keyExtractor={(item, index) => index}
            data={Object.keys(bookingData)}
            ListEmptyComponent={<Text style={{fontSize:24, alignSelf: 'center', marginTop: 30}}>No Bookings Found</Text>}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{padding: 15, borderBottomColor:'grey', borderBottomWidth:1}} onPress={()=>{navigation.push('Booking Details Driver', {item: item, driverId: route.params})}}>
                <View style={{flexDirection: 'row'}}>
                <View>
                <Text>{bookingData[item].Date},{bookingData[item].Time}</Text> 
                <Text >Source: {bookingData[item].PickupCity}, {bookingData[item].PickUpAddress}</Text>
                <Text>Destination: {bookingData[item].DropoffCity}, {bookingData[item].DropoffAddress}</Text>
                </View>
                </View>
                <View>
                <Text style={{marginTop: 5, fontSize: 20, alignSelf:'flex-end', fontWeight: "bold"}}>{bookingData[item].Offer} Rs</Text>
                </View>
              </TouchableOpacity>
            )}
          />
      </View>
    )
  }