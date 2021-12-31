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



export default function Payment ()  {
    const [check1, setCheck1] = React.useState(false);
  
    return (
      <ScrollView>
      <View style={{ padding: 20, marginTop: 20}}>
      <Text style={{fontSize: 40, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10}}>16800 Rs</Text>
      
      <Text style={{fontSize: 15, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10}}>24-January-2021 3:45pm</Text>
        <Text style={{ padding: 10 }}>
          Card Number
        </Text>
        <View style={{flexDirection:"row"}}>
        <TextInput
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 5,
            marginLeft: 10,
            width: '80%',
            borderRadius: 4,
          }}
        />
         <Icon
            name='cc-visa'
            color='#517fa4'
          />
        </View>
  
        <Text style={{ padding: 10 }}>Cardholder Name </Text>
    <TextInput
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 5,
            marginLeft: 10,
            width: '100%',
            borderRadius: 4,
          }}
        />   
        <View style={{flexDirection:"row"}}>
        <Text style={{ padding: 10 }}>Expire Date </Text>
        <Text style={{ padding: 10, marginLeft:10 }}>CVV</Text>
        </View>
        <View style={{flexDirection: "row"}}>
        <TextInput
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 5,
            marginLeft: 10,
            width: '30%',
            borderRadius: 4,
          }}
        />
        <TextInput
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 5,
            marginLeft: 10,
            width: '20%',
            borderRadius: 4,
          }}
        />  
        
        </View>
        <CheckBox
          checkedColor="#0B9F72"
          containerStyle={{
            borderWidth: 0,
            padding: 0,
            backgroundColor: 'white',
            marginTop: 20
          }}
          title="Save Card"
          checked={check1}
          onPress={() => setCheck1(!check1)}
        />
        
        <TouchableOpacity
          style={{
            backgroundColor: '#0B9F72',
            padding: 10,
            width: "70%",
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={{ alignSelf: 'center', color: 'white' }}>Pay</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  };
  
  
  