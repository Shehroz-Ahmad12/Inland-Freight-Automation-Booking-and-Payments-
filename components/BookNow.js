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

export default function BookNow ()  {

  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <ScrollView>
    <View style={{backgroundColor: "lightgrey", height: "100%"}}>
    <View style={{ padding: 20, marginTop: 20, backgroundColor: "white", margin: 10}}>
      <Text style={{ padding: 10 }}>Pickup City: </Text>
      <TextInput
        style={styles.textInput}
      />
      <Text style={{ padding: 10 }}>Pickup Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}
      />
<Text style={{ padding: 10 }}>Dropoff City: </Text>
      <TextInput
        style={styles.textInput}
      />
      <Text style={{ padding: 10 }}>Dropoff Address: </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.textInput,{height: 70}]}/>
      <Text style={{ padding: 10 }}>Select Vehicle: </Text>
      <Picker
        selectedValue={selectedValue}
        style={[styles.textInput,{fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
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
        style={[styles.textInput,{height: 70}]}      />
      <TouchableOpacity
        style={styles.buttonStyle}>
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
  
  
  
  