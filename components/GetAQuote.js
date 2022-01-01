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




export default function  GetAQuote ()  {
  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedIndex1, setSelectedIndex1] = React.useState(0);

  return (
    <ScrollView>
    <View style={{backgroundColor: "lightgrey", height: "100%"}}>
    <View style={{ padding: 20, marginTop: 20, backgroundColor: "white", margin: 20}}>
      <ButtonGroup
        buttons={[
          'Your Shipment is less than 50 kg',
          'Your Shipment is more than 50 kg',
        ]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
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
      <Text style={{ padding: 10, marginTop: 20 }}>Are your items: </Text>
      <CheckBox
        checkedColor="#0B9F72"
        containerStyle={styles.checkBoxContainer}
        title="Pallets"
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />
      <CheckBox
        checkedColor="#0B9F72"
        containerStyle={styles.checkBoxContainer}
        title="Loose Cartons"
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />

      <CheckBox
        checkedColor="#0B9F72"
        containerStyle={styles.checkBoxContainer}
        title="Full Truck Load"
        checked={check3}
        onPress={() => setCheck3(!check3)}
      />

      <CheckBox
        checkedColor="#0B9F72"
        containerStyle={styles.checkBoxContainer}
        title="Others (Mixed)"
        checked={check4}
        onPress={() => setCheck4(!check4)}
      />
      <Text style={{ padding: 10 }}>Pieces: </Text>
      <TextInput
        style={styles.textInput}/>
      <Text style={{ padding: 10 }}>Weight: </Text>
      <TextInput
        style={styles.textInput}/>
      <Text style={{ padding: 10 }}>Dimensions: </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ padding: 10 }}>Height: </Text>
        <TextInput
          style={{
            borderColor: '#066145',
            borderWidth: 1,
            padding: 3,
            marginLeft: 10,
            width: '20%',
            borderRadius: 4,
          }}
        />
        <Text style={{ padding: 10 }}>Width: </Text>
        <TextInput
          style={styles.textInput2}
        />
      </View>
      

      <Text style={{ padding: 10 }}>
        Anything else you want to specify about your shipment:{' '}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={[styles.textInput, {height:100}]}
      />
      <Text style={{ padding: 10 }}>Temp Controlled/ Perishable Goods? </Text>
      <Picker
        selectedValue={selectedValue}
        style={[styles.textInput, {fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Please Specify" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>
      <Text style={{ padding: 10 }}>Do you need insurance? </Text>
      <Picker
        selectedValue={selectedValue}
        style={[styles.textInput, {fontSize:12}]}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Please Specify" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>
      <Text style={{ padding: 10 }}>Are you a? </Text>
      <ButtonGroup
        buttons={['Private Customer', 'Business Customer']}
        selectedIndex={selectedIndex1}
        onPress={(value) => {
          setSelectedIndex1(value);
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
        }}>
        <Text style={{ alignSelf: 'center', color: 'white' }}>Next</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
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
  }
});
