import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
  Modal, FlatList
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';



export default function  GetAQuote ({navigation})  {

  const [category, setCategory] = React.useState(0);
  const [type, setType] = React.useState('');
  const [insurance, setInsurance] = React.useState('');
  const [customerType, setCustomerType] = React.useState(0);
  const [isPickup, setIsPickup]= React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [getText, setText] = React.useState();  
  const [pickUpCity, setPickUpCity] = React.useState("");
  const [dropOffCity, setDropOffCity] = React.useState("");
  const[citiesData, setCitiesData]= React.useState();
  
  const [quoteData, setQuote] =React.useState({Category: '',PickupCity: pickUpCity, PickUpAddress: '', DropoffCity: dropOffCity, DropoffAddress: '',
    Description: '', Weight: '', Pieces:'', Width: '', Height: '', Insurance:insurance, TempControlled: type, CustomerType:''});


    const SaveQuote = async () => {
      
      setQuote({...quoteData, DropoffCity:dropOffCity})
      setQuote({...quoteData, PickupCity:pickUpCity})

      
      console.log(quoteData)
      var obj= quoteData;
      var item = await AsyncStorage.getItem('@store:savedQuotes');
      item=JSON.parse(item);
      item=[...item, obj] 
      console.log('Saving');
      await AsyncStorage.setItem(
        '@store:savedQuotes',
        JSON.stringify(item)
      );
      console.log('Saving Done!');
      navigation.goBack();
    };
  
    const LoadData = async () => {
      console.log('Loading');
      var item = await AsyncStorage.getItem('@store:savedQuotes');
      var parsed = JSON.parse(item)
     console.log(parsed);
      console.log('Loading Done!');
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() => {LoadData()}}
          style={{backgroundColor: "white", padding: 10, marginLeft:10, borderRadius:10}}
        ><Text>View Quotes</Text></TouchableOpacity>
      )
    });
  });



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
                isPickup?setPickUpCity(item):setDropOffCity(item);
                setModalVisible(!modalVisible)
                
              }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
          </View>
        </View>
      </Modal>
      


    <ScrollView>
    <View style={{backgroundColor: "lightgrey", height: "100%"}}>
    <View style={{ padding: 20, marginTop: 20, backgroundColor: "white", margin: 20}}>
       <ButtonGroup
        buttons={[
          'Your Shipment is less than 50 kg',
          'Your Shipment is more than 50 kg',
        ]}
        selectedIndex={category}
        onPress={(value) => {
          setCategory(value);
          if(value===0){
            setQuote({...quoteData, Category: 'Less than 50 kg'})
          }
          else{
            setQuote({...quoteData, Category: 'More than 50 kg'})
          }
          
        }}
        containerStyle={{
          backgroundColor: 'white',
          height: 100,
          width: '90%',
        }}
        buttonStyle={{ padding: 10, color: 'black' }}
        selectedButtonStyle={{
          borderColor: '#066145',
          borderWidth: 2,
          backgroundColor: '#0B9F72',
        }}
      />

      <Text style={{ padding: 10 }}>Pieces: </Text>
      <TextInput
        keyboardType='numeric'
        style={styles.textInput}
        onChangeText={(v)=> {setQuote({...quoteData, Pieces: v});}}
        />
      <Text style={{ padding: 10 }}>Weight (kg): </Text>
      <TextInput
      keyboardType='numeric'
        style={styles.textInput}
        onChangeText={(v)=> {setQuote({...quoteData, Weight: v});}}/>
      <Text style={{ padding: 10 }}>Dimensions (cm): </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ padding: 10 }}>Height: </Text>
        <TextInput
        keyboardType='numeric'
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 3,
            marginLeft: 10,
            width: '20%',
            borderRadius: 4,
          }}
          onChangeText={(v)=> {setQuote({...quoteData, Height: v});}}
        />
        <Text style={{ padding: 10 }}>Width: </Text>
        <TextInput
        keyboardType='numeric'
          style={styles.textInput2}
          onChangeText={(v)=> {setQuote({...quoteData, Width: v});}}
        />
      </View>
      <Text style={{ padding: 10 }}>Pickup City: </Text>
      <TouchableOpacity style={[styles.textInput,{padding: 5}]} onPress={()=>{setIsPickup(true);setModalVisible(true);}}><Text>{pickUpCity===""?"Select City": pickUpCity}</Text></TouchableOpacity>
     
      <Text style={{ padding: 10 }}>Pickup Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
        onChangeText={(v)=> {setQuote({...quoteData, PickUpAddress: v});}}
      />
      <Text style={{ padding: 10 }}>Dropoff City: </Text>
      <TouchableOpacity style={[styles.textInput,{padding: 5}]} onPress={()=>{setIsPickup(false);setModalVisible(true);}}><Text>{dropOffCity===""?"Select City": dropOffCity}</Text></TouchableOpacity>
      <Text style={{ padding: 10 }}>Dropoff Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
        onChangeText={(v)=> {setQuote({...quoteData, DropoffAddress: v});}}
        />

      <Text style={{ padding: 10 }}>
        Anything else you want to specify about your shipment:{' '}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={[styles.textInput, {height:100}]}
        onChangeText={(v)=> {setQuote({...quoteData, Description: v});}}
      />
      <Text style={{ padding: 10 }}>Temp Controlled/ Perishable Goods? </Text>
      <Picker
        selectedValue={type}
        style={[styles.textInput, {fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => setQuote({...quoteData, TempControlled: itemValue})}>
        <Picker.Item label="Please Specify" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>
      <Text style={{ padding: 10 }}>Do you need insurance? </Text>
      <Picker
        selectedValue={insurance}
        style={[styles.textInput, {fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => setQuote({...quoteData, Insurance: itemValue})}>
        <Picker.Item label="Please Specify" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>
      <Text style={{ padding: 10 }}>Are you a? </Text>
      <ButtonGroup
        buttons={['Private Customer', 'Business Customer']}
        selectedIndex={customerType}
        onPress={(value) => {
          setCustomerType(value);
          if(value===0){
            setQuote({...quoteData, CustomerType: 'Private'})
          }
          else{
            setQuote({...quoteData, CustomerType: 'Business'})
          }
        }}
        containerStyle={{
          backgroundColor: 'white',
          height: 70,
          width: '90%',
        }}
        buttonStyle={{ padding: 10, color: 'black' }}
        selectedButtonStyle={{
          borderColor: '#066145',
          borderWidth: 2,
          backgroundColor: '#0B9F72',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#0B9F72',
          padding: 10,
          width: 100,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
        }}
        onPress={SaveQuote}
        
        >
        <Text style={{ alignSelf: 'center', color: 'white' }}>Save Quote</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    
    </View>
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
    textInput2: {
      borderColor: '#066145',
      borderWidth: 1,
      padding: 3,
      marginLeft: 10,
      width: '20%',
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
  checkBoxContainer:{
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'white',  
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
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 1,
    borderRadius: 10,

  },
});
