import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView, Button, Alert
} from 'react-native';
import Constants from 'expo-constants';
import { CheckBox, Icon, Input, ButtonGroup } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function BookNow ()  {

  const [selectedValue, setSelectedValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [bookingData, setBooking] =React.useState({PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
   Vehicle: '', Description: '', Weight: '', Offer: '', DateTime:date.toString()});

  const clear= ()=>{
    setBooking({PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
    Vehicle: '', Description: '', Weight: '', Offer: '', DateTime:date});  }

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(bookingData),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/bookings.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBooking({...bookingData, DateTime: currentDate})
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <ScrollView>
    <View style={{backgroundColor: "lightgrey", height: "100%"}}>
    <View style={{ padding: 20, marginTop: 20, backgroundColor: "white", margin: 20}}>
      <Text style={{ padding: 10 }}>Pickup City: </Text>
      <TextInput onChangeText={(v)=> {setBooking({...bookingData, PickupCity: v});}}
        style={styles.textInput}
      />
      <Text style={{ padding: 10 }}>Pickup Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
        onChangeText={(v)=> {setBooking({...bookingData, PickUpAddress: v});}}
      />
<Text style={{ padding: 10 }}>Dropoff City: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(v)=> {setBooking({...bookingData, DropoffCity: v});}}
      />
      <Text style={{ padding: 10 }}>Dropoff Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
        onChangeText={(v)=> {setBooking({...bookingData, DropoffAddress: v});}}
        />

      <Text style={{ padding: 10 }}>Select Vehicle: </Text>
      <Picker
        selectedValue={selectedValue}
        style={[styles.textInput,{fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); setBooking({...bookingData, Vehicle: itemValue});}}>
        <Picker.Item label="Please Specify" value="" />
        <Picker.Item label="Truck" value="truck" />
        <Picker.Item label="Shehzore" value="shehzore" />
        <Picker.Item label="Mazda" value="mazda" />
        <Picker.Item label="Suzuki" value="suzuki" />

      </Picker>
      <Text style={{ padding: 10 }}>Goods Description: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}   
        onChangeText={(v)=> {setBooking({...bookingData, Description: v});}}   />
      <Text style={{ padding: 10 }}>Approx. Weight (kgs): </Text>
      <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v)=> {setBooking({...bookingData, Weight: v});}}/>
      <Text style={{ padding: 10 }}>Your Offer (Rs): </Text>
      <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v)=> {setBooking({...bookingData, Offer: v});}}/>

      <TouchableOpacity style={[styles.textInput,{marginTop: 20}]} onPress={showDatepicker}><Text>Choose Date</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.textInput,{marginTop: 20}]} onPress={showTimepicker} ><Text>Choose Time</Text></TouchableOpacity>
        <Text style={{padding: 10}}>{date.toString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity
        style={styles.buttonStyle} onPress={()=>{ 
          Alert.alert(
            'Confirm Order',
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirm", onPress: () => {postData(); clear();}}
            ]
          )
          
          }}>
          
        <Text style={styles.buttonText} >Confirm</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
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
  
  
  
  