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

export default function ApplyJob({navigation, route}){
   
    const id= route.params.item;
    const [bookingData, setBookingData]= React.useState({});
    const{PickUpAddress, DropoffAddress, PickupCity, Description,DropoffCity,Status, Vehicle, Offer, Weight, Date, Time }=bookingData;

    const getBookingsData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
      const data = await response.json();
      setBookingData(data);
      console.log(data);
    };

    const applyJob = ()=>{
        const id = route.params.item;
        const driverId =route.params.driverId;
        var data= bookingData;
        data["Status"]="In-Process";
        data["Driver"]=driverId;
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
      <View style={{backgroundColor: 'lightgrey', height: "100%"}}>
      <ScrollView>
                                        <Text style={{fontSize: 26, fontWeight: 'bold', alignSelf: 'center', marginBottom:10, backgroundColor: '#066145', width: "100%",padding: 15, textAlign: 'center',  color: 'white'}}>Apply Job</Text>

                  <Text style={{fontSize: 40, marginTop:20, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10}}>{Offer} Rs</Text>
                      <Text style={{fontSize: 16, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10,fontWeight: "bold" }}>{Date}, {Time}</Text>
                      
                      <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10}}>
                      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
                      <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{PickupCity}, {PickUpAddress}</Text>
                      
                      <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal:10}}>Desitination </Text>
                      <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{DropoffCity}, {DropoffAddress}</Text>
                      </View>
                      <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10}}>
                      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Description </Text>
                      <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{Description}</Text>
                    </View>
                      <View  style={{backgroundColor: 'white', padding: 10, margin: 2,  marginHorizontal:10,flexDirection: "row", alignItems: 'center'}}>
                      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Vehicle Type </Text>
                      <Text style={{fontSize: 16, marginLeft: 50, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Vehicle}</Text>
                    </View>
                    <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, flexDirection: "row", alignItems: 'center'}}>
                      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Status </Text>
                      <Text style={{fontSize: 16, marginLeft: 50, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Status}</Text>
                    </View>
                    <View  style={{backgroundColor: 'white', padding: 10, margin: 2 , marginHorizontal:10,flexDirection: "row", alignItems: 'center'}}>
                      <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Weight </Text>
                      <Text style={{fontSize: 16, marginLeft: 50, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Weight} kg</Text>
                    </View>
                      <TouchableOpacity onPress={()=>{Alert.alert(
                    'Apply',
                    "Are you sure you want to apply for this job?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "Confirm", onPress: () => {applyJob(); navigation.goBack();}}
                    ]
                  )}} style={{marginTop:20 , padding:10 ,marginBottom: 20, backgroundColor: "#0B9F72", width: 200 ,alignSelf:'center',borderRadius: 5}}><Text style={{alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18}}>Apply For Job</Text></TouchableOpacity>
               
               </ScrollView>
                </View>
    )
  }
  