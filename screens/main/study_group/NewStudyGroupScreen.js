import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class NewStudyGroupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      class_code: '',
      professor_name: '',
      date: "October 15th 2019, 08:00 pm",
      location: '',
      image: null
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        {!image ?
          <ImageBackground
            source={require('../../../assets/empty_image.png')}
            style={{width: '100%', height: 200 }}
          >
          <Button
            title="Add Photo"
            onPress={this._pickImage}
            style={{ width: "40%", margin: "30%", borderWidth: "1", borderColor: 'white',  }}
            titleStyle={{color: "white"}}
            type="clear"
            icon={{
              name: "photo",
              size: 20,
              color: "white"
            }}
          />
          </ImageBackground> :
          <ImageBackground
            source={{ uri: image }}
            style={{width: '100%', height: 200 }}
          >
          <Button
            onPress={this._pickImage}
            style={{ height: "100%", width: "100%", borderWidth: "1", borderColor: 'white',  }}
            titleStyle={{color: "white"}}
            type="clear"
          />
          </ImageBackground>
        }

        <Input
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
          placeholder={'Study Group name'}
          inputStyle={styles.inputNameStyle}
          inputContainerStyle={{marginBottom: "5%"}}
        />
        <DatePicker
          style={{ width: "87%", marginBottom: "2%", marginTop: "2%" }}
          date={this.state.date} //initial date from state
          mode="datetime" //The enum of date, datetime and time
          placeholder="select date"
          format="MMMM Do YYYY, h:mm a"
          minDate="October 15th 2009, 08:00 pm"
          maxDate="October 15th 2020, 08:00 pm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <Input
          value={this.state.class_code}
          onChangeText={(class_code) => this.setState({ class_code })}
          placeholder={'Class code'}
          inputContainerStyle={styles.inputContainerStyle}
          leftIcon={
            <Icon
              name='class'
              size={26}
              color='black'
            />
          }
          leftIconContainerStyle={{paddingRight: "5%"}}
        />
        <Input
          value={this.state.professor_name}
          onChangeText={(professor_name) => this.setState({ professor_name })}
          placeholder={'Professor name'}
          // inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainerStyle}
          leftIcon={
            <Icon
              name='person'
              size={26}
              color='black'
            />
          }
          leftIconContainerStyle={{paddingRight: "5%"}}
        />
        <Input
          value={this.state.location}
          onChangeText={(location) => this.setState({ location })}
          placeholder={'Location'}
          // inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainerStyle}
          leftIcon={
            <Icon
              name='location-on'
              size={26}
              color='black'
            />
          }
          leftIconContainerStyle={{paddingRight: "5%"}}
        />

        <Button
          title={'CREATE'}
          containerStyle={{ width: "95%", height: "85%", marginTop: 10,  }}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: "5%",
    marginRight: "5%",
  },
  inputNameStyle: {
    marginTop: "5%",
    fontSize: 20
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingBottom: "2%"
  },
  submitButtonStyle: {
    position: "absolute",
    bottom: 0
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    // width: "100%",
    // height: "%100",
    margin: 10
  },
});
