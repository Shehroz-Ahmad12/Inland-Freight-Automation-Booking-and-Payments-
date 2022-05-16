import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView,
  FlatList,
  Alert,
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

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

import logo from './assets/IFLA-06.png';

import Payment from './components/Payment';
import GetAQuote from './components/GetAQuote';
import BookNow from './components/BookNow';
import MyBookings from './components/MyBookings';
import BookingDetails from './components/BookingDetails';
import PendingBookings from './components/PendingBookings';
import FindJobs from './components/FindJobs';
import ApplyJob from './components/ApplyJob';
import MyJobs from './components/MyJobs';
import BookingDetailsDriver from './components/BookingDetailsDriver';
import MyCompletedBookingsDriver from './components/MyCompletedBookingsDriver';
import PendingPayments from './components/PendingPayments';
import CompletedBookingsDriverDetails from './components/CompletedBookingsDriverDetails';
import PendingBookingDetails from './components/PendingBookingDetails';
import { Button } from 'react-native-elements/dist/buttons/Button';

const FIREBASE_API_ENDPOINT =
  'https://freight-automation-default-rtdb.firebaseio.com/';





const Booking = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View>
        <Image
          style={{
            backgroundColor: "#E0EFF6",
            width: 350,
            height: 320,
            alignSelf: 'center',
            marginBottom: 5,
          }}
          source={logo}
        />
        <View>
          <View
            style={{
              marign: 50,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.mainButtons}
                onPress={() => {
                  console.log('Booking');
                  navigation.push('Book Now');
                }}>
                <Text style={styles.mainButtonText}>Schedule Booking</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtons}
                onPress={() => navigation.navigate('Get a Quote')}>
                <Text style={styles.mainButtonText}>Generate a quote</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.mainButtons}
                onPress={() => {
                  navigation.navigate('Pending Bookings');
                }}>
                <Text style={styles.mainButtonText}>Pending Bookings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButtons}
                onPress={() => navigation.push('My Bookings')}>
                <Text style={styles.mainButtonText}>My Bookings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};






const DriverBookings = ({ navigation }) => {
  const [driver, setDriver] = React.useState('-MsP64tYV3CF2Hnr8ofo');
  return (
    <ScrollView>
      <View>
        <Image
          style={{
            width: 350,
            height: 320,
            alignSelf: 'center',
            marginBottom: 5,
          }}
          source={logo}
        />
        <View>
          <View
            style={{
              marign: 50,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            
            <TouchableOpacity
                style={{
                  backgroundColor: '#068E94',
                  padding: 40,
                  width: '93%',
                  margin: 10,
                }}
                onPress={() => {
                  navigation.push('My Jobs', driver);
                }}>
                <Text style={styles.mainButtonText}>My Assignments</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  backgroundColor: '#068E94',
                  padding: 40,
                  width: '93%',
                  margin: 10,
                }}
                onPress={() => {
                  navigation.push('My Completed Bookings Driver', driver);
                }}>
                <Text style={styles.mainButtonText}>My Completed Bookings</Text>
              </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Profile = () => {
  
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function BookingStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
      headerStyle: { backgroundColor: '#005761', padding: 0 }}}>
      <Stack.Screen name="Booking" component={Booking} options={{headerShown: false}} />
      <Stack.Screen name="Book Now" component={BookNow} />
      <Stack.Screen name="Get a Quote" component={GetAQuote} />
      <Stack.Screen name="Pending Bookings" component={PendingBookings} />
      <Stack.Screen
        name="Pending Booking Details"
        component={PendingBookingDetails}
      />
      <Stack.Screen name="My Bookings" component={MyBookings} />
      <Stack.Screen name="Booking Details" component={BookingDetails} />
    </Stack.Navigator>
  );
}

function DriverStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
      headerStyle: { backgroundColor: '#068E94', padding: 0 }}}>
      <Stack.Screen name="Driver Bookings" component={DriverBookings}  options={{headerShown: false}}/>
      <Stack.Screen name="Find Jobs" component={FindJobs} />
      <Stack.Screen name="Apply Job" component={ApplyJob} />
      <Stack.Screen name="My Jobs" component={MyJobs} />
      <Stack.Screen
        name="My Completed Bookings Driver"
        component={MyCompletedBookingsDriver}
        options={{title: "Completed Jobs"}}
      />
      <Stack.Screen
        name="Booking Details Driver"
        component={BookingDetailsDriver}
        options={{title: "Booking Details"}}
      />
      <Stack.Screen
        name="Completed Bookings Driver Details"
        component={CompletedBookingsDriverDetails}
        options={{title: "Booking Details"}}
      />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontWeight: 'bold'},
      headerStyle: { backgroundColor: '#068E94', padding: 0 }}}>
      <Stack.Screen name="My Payments" component={PendingPayments} options={{headerShown: false}}/>
      <Stack.Screen name="Payment Details" component={Payment} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Booking Menu" component={BookingStack} />
      <Drawer.Screen name="Driver Menu" component={DriverStack} />
      <Drawer.Screen name="Payments Menu" component={PaymentStack} />
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
  
  mainButtons: {
    backgroundColor: '#068E94',
    padding: 40,
    width: '45%',
    margin: 10,
  },
  mainButtonText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
