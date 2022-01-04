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

import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';


import logo from './assets/Falas.png'; 

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
import { Button } from 'react-native-elements/dist/buttons/Button';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';
const PUBLISHABLE_KEY = "pk_test_51KEBKKEaKSJeoPtKDUVrGpCvY5CyR40zYsTbaFjbAIcv4ii8f2uY0t6omkYUPfvxzJvTaZLbhVO3FEFWTH7TbmJN00R6zJ0ytm"

const FindBookings= ({navigation})=>{
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
              console.log("Find Jobs")
              navigation.push('Find Jobs')}}>
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>Find Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10
              
            }}
            onPress={() => navigation.navigate('My Jobs')}>
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>My Jobs</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0B9F72',
              padding: 40,
              width: "45%",
              margin: 10

            }}
            onPress={()=>{navigation.navigate('My Completed Bookings')}}
            >
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>My Completed Bookings</Text>
          </TouchableOpacity>

        </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );

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

            }}
            onPress={()=>{navigation.navigate('Pending Bookings')}}
            >
            <Text style={{fontSize: 20, alignSelf: 'center',color: "white", fontWeight: "bold"}}>Pending Bookings</Text>
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

const Profile = () => {
  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        Name: 'Shehroz Ahmad',
        Vehicle: 'Mazda',
        VehicleNo: 'MQ-234',
        Contact: '03153234545'
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/drivers.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (<View><Button title="Click" onPress={postData}/></View>);
};

const CardPayment = ()=>{
  const [name, setName] = React.useState();
  const {confirmPayment, loading}= useConfirmPayment();

  const handlePayments = async() => {
    const response = await fetch(`${"http://localhost:19002"}/create-payment-intent`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodType: 'card', 
        currency: 'usd'
      })
    })
    const {clientsecret}  = await response.json();
    const {error, paymentIntent} = await confirmPayment(clientsecret,{
      type: 'Card',
      billingDetails: {name}
    })
    if(error){
      Alert.alert(`Error code: ${error.code} `, error.message);
    }else if(paymentIntent){
      Alert.alert('Success', `Payment Successful: ${paymentIntent.id}`);
    }
    
  }

  return(
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
    <View>
    <Text style={{ padding: 10 }}>Name: </Text>
      <TextInput onChangeText={(v)=> {setName(v);}}
        style={styles.textInput}
      />
      <CardField postalCodeEnabled={false} style={{width: "90%",height: 40, marginVertical: 30, marginLeft: 10}} 
        cardStyle={{borderColor: "#066145", borderWidth: 1, borderRadius: 5}}
      />
      <TouchableOpacity style={{marginTop:20, 
        padding:10, 
        backgroundColor: "#0B9F72", 
        width: 200, 
        alignSelf:'center', 
        borderRadius: 10}}
        onPress={handlePayments}
        disabled={loading}
        >
        <Text style={{alignSelf: "center", color: 'white'}}>Pay</Text>
        </TouchableOpacity>
    </View>
    </StripeProvider>
  )
}

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
        name="Pending Bookings"
        component={PendingBookings}
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
        name="Find Bookings"
        component={FindBookings}
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
        name="Find Jobs"
        component={FindJobs}
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
        name="Apply Job"
        component={ApplyJob}
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
        name="My Jobs"
        component={MyJobs}
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
        name="My Completed Bookings"
        component={MyCompletedBookingsDriver}
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
        component={BookingDetailsDriver}
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
      <Drawer.Screen name="Payments" component={CardPayment} />
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
  textInput: {
      borderColor: '#066145',
      borderWidth: 1,
      padding: 3,
      marginLeft: 10,
      width: '90%',
      borderRadius: 4,
    },
  buttonStyle: {
      backgroundColor: '#0B9F72',
      padding: 10,
      width: 100,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 20,
    },
    buttonText: {
      alignSelf: 'center', color: 'white'
    },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});



