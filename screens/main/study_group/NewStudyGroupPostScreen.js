import React, { Component } from 'react'
import { View, SafeAreaView, StyleSheet, Text, ImageBackground, Platform } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import shrinkImageAsync from '../../../utils/shrinkImageAsync'
import uploadImageAsync from '../../../utils/uploadImageAsync'
import { axiosInstance } from '../../../services/client'
import { tokenConfig } from '../../../actions/auth_actions'
import { errorFormatter } from '../../../actions/errorActions'

const numberOfLines = 10

export default class NewStudyGroupPostScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: null,
      image: null,
      msg: '',
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
      aspect: [4, 3],
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

  onCreate = (id) => async() => {
    const { image, content } = this.state

    let image_url = null

    if(image) {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        this.state.image,
      );

      image_url  = await uploadImageAsync(reducedImage);
    }

    const new_post  = {
      image_url: image ? image_url : null,
      content
    }

    await axiosInstance.post(`/study_groups/${id}/study_group_posts`, new_post, tokenConfig())
      .then(() => this.props.navigation.navigate('StudyGroupDetail'))
      .catch(err => this.setState({ msg: errorFormatter(err.response.data.errors) })
      )
  }

  render() {
    const { image, content } = this.state
    const { id } = this.props.navigation.state.params

    return (
      <SafeAreaView style={styles.container}>
        <Input
            value={content}
            onChangeText={(content) => this.setState({ content })}
            placeholder={"What's on your mind?"}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{ minHeight: numberOfLines*20 }}
            multiline={true}
            numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
            autoFocus={true}
          />

          {!image ?
            <ImageBackground
              source={require('../../../assets/empty_image.png')}
              style={{width: '100%', height: 200, alignItems: 'center' }}
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
          <Text style={styles.errorText}>{this.state.msg}</Text>
          <Button
          title={'CREATE POST'}
          containerStyle={{ width: "100%", height: "85%", marginTop: 10 }}
          buttonStyle={styles.submitButtonStyle}
          onPress={this.onCreate(id)}
        />
      </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: "5%",
    marginRight: "5%",
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingBottom: "5%",
    paddingTop: "5%",
    width: "90%",
    minHeight: 100
  },
  submitButtonStyle: {
    backgroundColor: '#5663a9'
  },
  errorText: {
    color: 'red',
    fontStyle: 'italic',
    marginLeft: "5%",
    marginRight: "5%"
  }
})