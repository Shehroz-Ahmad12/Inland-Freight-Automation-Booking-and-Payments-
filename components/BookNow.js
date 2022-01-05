import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  FlatList,
  ScrollView, Button, Alert, Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function BookNow ({navigation})  {
  
  const [isPickup, setIsPickup]= React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [getText, setText] = React.useState();
  const [pickUpCity, setPickUpCity] = React.useState("");
  const [dropOffCity, setDropOffCity] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const[citiesData, setCitiesData]= React.useState();
  
  const [bookingData, setBooking] =React.useState({PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
   Vehicle: '', Description: '', Weight: '', Offer: '', Date:date.toDateString(), Time:date.toTimeString(), Status: 'Pending'});

  const clear= ()=>{
    setBooking({PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
    Vehicle: '', Description: '', Weight: '', Offer: '', Date:date.toDateString(),Time:date.toTimeString(), Status: 'Pending'});  }

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

  const getCitiesData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/cities.json`);
    const data = await response.json();
    var arr;
    var arr2=[];
    for(let key in data){
      arr = data[key] 
    }
    arr.forEach(element => {
      arr2.push(element.city);
    });

    setCitiesData(arr2);
    setText(arr2);
  };

  React.useEffect(() => {
    getCitiesData();
  }, [setCitiesData], [setText]);



  const filter = (text) => {
    console.log(getCitiesData);
    var result = getText.filter((city) => {
      if (city.includes(text)) {
        return city;
      }
    });
    console.log(result);
    setCitiesData(result);

  };



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

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

  const setPickup = (item)=>{
    setPickUpCity(item);
    setBooking({...bookingData, PickupCity: item})
    setModalVisible(!modalVisible);
  }

  const setDropOff = (item)=>{
    setDropOffCity(item);
    setBooking({...bookingData, DropoffCity: item})
    setModalVisible(!modalVisible);
  }



  return (
    <View>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
          placeholder="Enter City Name"
          style={{ padding: 5, width: '80%' }}
          onChangeText={(v) => {
            filter(v);
          }}
        />
        <FlatList style={{width: "100%"}}
          refreshing={false}
          onRefresh={getCitiesData}
          keyExtractor={(item, index) => index}
          data={citiesData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.countryLabel}
              onPress={() => {
                isPickup?setPickup(item):setDropOff(item);
                
              }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
          </View>
        </View>
      </Modal>
      
    <View style={{backgroundColor: "lightgrey", height: "100%"}}>
    <ScrollView>
    
    <View style={{ padding: 20, marginTop: 20, backgroundColor: "white", margin: 20}}>
      <Text style={{ padding: 10 }}>Pickup City: </Text>
      <TouchableOpacity style={[styles.textInput,{padding: 5}]} onPress={()=>{setIsPickup(true);setModalVisible(true);}}><Text>{pickUpCity===""?"Select City": pickUpCity}</Text></TouchableOpacity>
     
      <Text style={{ padding: 10 }}>Pickup Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
        onChangeText={(v)=> {setBooking({...bookingData, PickUpAddress: v});}}
      />
      <Text style={{ padding: 10 }}>Dropoff City: </Text>
      <TouchableOpacity style={[styles.textInput,{padding: 5}]} onPress={()=>{setIsPickup(false);setModalVisible(true);}}><Text>{dropOffCity===""?"Select City": dropOffCity}</Text></TouchableOpacity>
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
        <Picker.Item label="Truck" value="Truck" />
        <Picker.Item label="Shehzore" value="Shehzore" />
        <Picker.Item label="Mazda" value="Mazda" />
        <Picker.Item label="Suzuki" value="Suzuki" />
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
      <Text style={{padding: 10}}>Choose Date:</Text>
      <TouchableOpacity style={[styles.textInput, {padding: 5}]} onPress={showDatepicker}><Text>{date.toDateString()}</Text></TouchableOpacity>
      <Text style={{padding: 10}}>Choose Time:</Text>
        <TouchableOpacity style={[styles.textInput, {padding: 5}]} onPress={showTimepicker} ><Text>{date.toTimeString()}</Text></TouchableOpacity>
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
              { text: "Confirm", onPress: () => {postData(); clear(); navigation.goBack()}}
            ]
          )
          }}>
        <Text style={styles.buttonText} >Confirm</Text>
      </TouchableOpacity>
    </View>

    </ScrollView>
    </View>
    </View>
    
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
    centeredView: {
      width: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22, 
      
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      width: "100%",
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    countryLabel: {
      width: "100%",
      padding: 10,
      backgroundColor: 'lightgreen',
      margin: 1,
      borderRadius: 10,
    },
  });
  
  
  
  