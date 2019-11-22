import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, Platform } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import shrinkImageAsync from '../../../utils/shrinkImageAsync'
import uploadImageAsync from '../../../utils/uploadImageAsync'
import { axiosInstance } from '../../../services/client';
import { tokenConfig } from '../../../actions/auth_actions'
import { errorFormatter } from '../../../actions/errorActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class NewStudyGroupScreen extends Component {
  constructor(props) {
    super(props);

    if (typeof this.props.navigation.getParam('study_group_object') !== 'undefined') {
      const { name, class_code, professor_name, meeting_time, image_url, id, location } = this.props.navigation.getParam('study_group_object')

      this.state = {
        id, name, class_code, professor_name, location,
        date: meeting_time,
        image: image_url,
        edit: true
      }

      console.log(this.state)
    } else {
      this.state = {
        id: null,
        name: '',
        class_code: '',
        professor_name: '',
        date: null,
        location: '',
        image: null,
        edit: false,
        msg: ''
      };
    }
  }

  _pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _captureImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  onSubmit = async () => {
    const { image, name, class_code, professor_name, location, date, id, edit } = this.state

    let image_url = null

    if(image) {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        this.state.image,
      );

      image_url  = await uploadImageAsync(reducedImage);
    }

    const new_study_group = {
      study_group_name: name,
      class_code: class_code,
      image_url: image ? image_url : null,
      professor_name: professor_name,
      location: location,
      meeting_time: date,
    }

    if(edit) {
      await axiosInstance.patch(`/study_groups/${id}`, new_study_group, tokenConfig())
      .then((res) => {
        const id = res.data.study_group.id
        this.props.navigation.navigate('StudyGroupDetail', { id, study_group_name: name, refresh: true, post_count: 0 })
      })
      .catch(err => this.setState({ msg: errorFormatter(err.response.data.errors) }))
    } else {
      await axiosInstance.post('/study_groups/', new_study_group, tokenConfig())
      .then((res) => {
        const id = res.data.study_group.id
        this.props.navigation.navigate('StudyGroupDetail', { id, study_group_name: name, refresh: true, post_count: 0 })
      })
      .catch(err => this.setState({ msg: errorFormatter(err.response.data.errors) }))
    }

  }

  render() {
    const { image, edit } = this.state;

    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
        {!image ?
          <ImageBackground
            source={require('../../../assets/empty_image.png')}
            style={{width: '100%', height: 200, alignItems: 'center', marginTop: 400 }}
          >
          <Button
            title="Pick a photo"
            onPress={this._pickImage}
            style={{ borderWidth: "1", borderColor: 'white', marginTop: "15%" }}
            titleStyle={{color: "white"}}
            type="clear"
            icon={{
              name: "photo",
              size: 20,
              color: "white"
            }}
          />
          <Button
            title="Use Camera"
            onPress={this._captureImage}
            style={{ borderWidth: "1", borderColor: 'white', marginTop: "5%" }}
            titleStyle={{color: "white"}}
            type="clear"
            icon={{
              name: "camera-alt",
              size: 20,
              color: "white"
            }}
          />
          </ImageBackground> :
          <ImageBackground
            source={{ uri: image }}
            style={{width: ' 100%', height: 200, marginTop: 400  }}
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
        <Text style={styles.errorText}>{this.state.msg}</Text>


        <Button
          title={edit ? 'UPDATE' : 'CREATE'}
          containerStyle={{ width: "95%", height: "85%", marginTop: 10 }}
          buttonStyle={styles.submitButtonStyle}
          onPress={this.onSubmit}
        />
        <View style={{ flex : 1, backgroundColor: 'blue', width: '100%' }} />
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "5%",
    marginRight: "5%",
    // backgroundColor: 'red',
    // marginTop: '60%'
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
    backgroundColor: '#5663a9'
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    // width: "100%",
    // height: "%100",
    margin: 10
  },
  errorText: {
    color: 'red',
    fontStyle: 'italic',
    marginLeft: "5%",
    marginRight: "5%"
  }
});
