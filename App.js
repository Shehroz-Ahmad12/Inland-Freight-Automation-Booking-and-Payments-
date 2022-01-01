import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView, FlatList
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

import logo from './assets/Falas.png'; 
import Payment from './components/Payment';
import GetAQuote from './components/GetAQuote';
import BookNow from './components/BookNow';
import { Button } from 'react-native-elements/dist/buttons/Button';
const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

 
const MyBookings =({ navigation })=>{
  const [bookingData, setBookingData] = React.useState({});

  const getBookingsData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings.json`);
    const data = await response.json();
    setBookingData(data);
    console.log(data);
    
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
 
const PendingPayments =({ navigation })=>{
  const [bookingData, setBookingData] = React.useState({});

  const getBookingsData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings.json`);
    const data = await response.json();
    setBookingData(data);
    console.log(data);
    
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
            <TouchableOpacity style={{padding: 15, borderBottomColor:'grey', borderBottomWidth:1}} onPress={()=>{navigation.navigate('Payment Details', item)}}>
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

const BookingDetails = ({navigation, route})=>{
  const id= route.params;
  const [bookingData, setBookingData]= React.useState({});
  const{PickUpAddress, DropoffAddress, PickupCity, DropoffCity, Vehicle, Offer, Weight, DateTime }=bookingData;
  
  const getBookingsData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
    const data = await response.json();
    setBookingData(data);
    console.log(data);
    
  };

  React.useEffect(() => {
    getBookingsData();
  }, [setBookingData]);


  return(
      <View>
      <Button title="Click me" onPress={()=>{console.log(PickUpAddress)}} />
        
            <View>
              <Text style={{fontSize: 40, marginTop:20, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10}}>{Offer} Rs</Text>
              <Text style={{fontSize: 15, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10}}>{DateTime}</Text>
              <Text style={{fontSize: 20, padding: 5, marginLeft: 15, marginTop:20}}>Source: {PickupCity}, {PickUpAddress}</Text>
              <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Destination: {DropoffCity}, {DropoffAddress}</Text>
              <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Vehicle Type: {Vehicle}</Text>
              <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Weight: {Weight} kg</Text>
              <Text style={{fontSize: 20, padding: 5, marginLeft: 15}}>Driver Details: </Text>
              </View>
        </View>
  )
}

const Booking = ({ navigation }) => {
  return (
    <ScrollView>
    <View >
      <Image
        style={{width: 250, height: 250, alignSelf:"center", marginTop: 20, marginBottom: 20}}
        source={logo}
      />
      <View>

       <View style={{marign: 50, alignContent: "center", justifyContent: 'center', alignItems: 'center'}}> 
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10
              
              
            }}
            onPress={() => {
              console.log("Booking")
              navigation.push('Book Now')}}>
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>Book Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10
              
            }}
            onPress={() => navigation.navigate('Get a Quote')}>
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>Generate a quote</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10
            }}>
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>Schedule Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10
            }} 
            onPress={()=> navigation.push('My Bookings')}>
            <Text style={{fontSize: 20, alignSelf: 'center', color: "white", fontWeight: "bold"}}>My Bookings</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};



const Tracking = () => {
  return (<View></View>);
};
const Profile = () => {
  return (<View></View>);
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function BookingStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerShown : false,
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Book Now"
        component={BookNow}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Get a Quote"
        component={GetAQuote}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="My Bookings"
        component={MyBookings}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
            <Stack.Screen
        name="Booking Details"
        component={BookingDetails}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function DriverStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerShown : false,
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Book Now"
        component={BookNow}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Get a Quote"
        component={GetAQuote}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="My Bookings"
        component={MyBookings}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
            <Stack.Screen
        name="Booking Details"
        component={BookingDetails}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Payments"
        component={PendingPayments}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
            <Stack.Screen
        name="Payment Details"
        component={Payment}
        options={{
          headerStyle: {
            backgroundColor: '#066145',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Booking" component={BookingStack} />
      <Drawer.Screen name="Driver" component={DriverStack} />
      <Drawer.Screen name="Payments" component={PaymentStack} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
