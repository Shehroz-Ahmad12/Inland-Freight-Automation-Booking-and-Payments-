import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import { CheckBox, Icon, Input, ButtonGroup } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
const PUBLISHABLE_KEY = "pk_test_51KEBKKEaKSJeoPtKDUVrGpCvY5CyR40zYsTbaFjbAIcv4ii8f2uY0t6omkYUPfvxzJvTaZLbhVO3FEFWTH7TbmJN00R6zJ0ytm"




export default function Payment ()  {
    const [check1, setCheck1] = React.useState(false);

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
  
    return (
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <ScrollView>
      <View style={{ padding: 20, marginTop: 20}}>
      <Text style={{fontSize: 40, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10}}>16800 Rs</Text>
      
      <Text style={{fontSize: 15, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10}}>24-January-2021 3:45pm</Text>
  
        <Text style={{ padding: 10 }}>Cardholder Name </Text>
    <TextInput
          style={styles.textInput}
        />   
      <CardField postalCodeEnabled={false} style={{width: "90%",height: 40, marginVertical: 30, marginLeft: 10}} 
        cardStyle={{borderColor: "#066145", borderWidth: 1, borderRadius: 5}}
      />



        <CheckBox
          checkedColor="#0B9F72"
          containerStyle={styles.checkBox}
          title="Save Card"
          checked={check1}
          onPress={() => setCheck1(!check1)}
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
      </ScrollView>
      </StripeProvider>
    );
  };
  
  
  const styles = StyleSheet.create({
    textInput: {
        borderColor: '#066145',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '90%',
        borderRadius: 4,
      },
      textInput2: {
        borderColor: '#066145',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '30%',
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
      checkBox:{
        
            borderWidth: 0,
            padding: 0,
            backgroundColor: 'white',
            marginTop: 20
          
      },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  
  
  
  