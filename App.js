import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView
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

const MyBookings =()=>{
  return(
    <View></View>
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
            }}>
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
    </Stack.Navigator>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Booking" component={BookingStack} />
      <Drawer.Screen name="Tracking" component={Tracking} />
      <Drawer.Screen name="Payments" component={Payment} />
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
