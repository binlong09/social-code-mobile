import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { getProfile } from '../../../actions/profile/profile_actions'
import { axiosInstance } from '../../../services/client'
import { tokenConfig } from '../../../actions/auth_actions'
import { showMessage, hideMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import shrinkImageAsync from '../../../utils/shrinkImageAsync'
import uploadImageAsync from '../../../utils/uploadImageAsync'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Item from '../../../components/study_group/Item'

const defaultImageSize = 136;

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const isOwner = navigation.getParam('owner')
    const title = isOwner ? "Your Profile" : `${navigation.getParam('name')}'s Profile`
    return {
      title,
      headerRight:
        <Button
          onPress={async() => {
            await AsyncStorage.clear()
            navigation.navigate({ routeName: 'auth'})
          }}
          title="Logout"
          buttonStyle={{marginRight: 10}}
          type="clear"
        />
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      name: null,
      email: null,
      graduation_date: null,
      major: null,
      phone_number: null,
      avatar_url: null,
      orignal_user: {},
      checkmark: false,
      image: null,
      bookmark_toggle: false,
      going_toggle: false,
      created_toggle: false
    }
  }

  componentDidMount() {
    const user_id = typeof this.props.navigation.getParam('user_id') == 'undefined' ? "" : this.props.navigation.getParam('user_id')

    this.props.getProfile(user_id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      const { name, email, avatar_url, graduation_date, major, phone_number } = this.props.user
      const original_user = { name, graduation_date, major, phone_number }
      this.setState({ name, email, avatar_url, major, graduation_date, phone_number, original_user })
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
      this.setState({ image: result.uri, checkmark: true });
      showMessage({
        message: "Press the checkmark to confirm avatar change",
        type: "info",
      })
    }
  };

  _onChangeAvatar = async () => {
    const { image } = this.state
    const { id } = this.props.user

    let avatar_url = null

    if(image) {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        this.state.image,
      );

      avatar_url  = await uploadImageAsync(reducedImage);
    }

    const object = {
      avatar_url
    }

    await axiosInstance.patch(`/users/${id}`, object, tokenConfig())
      .then(() => {
        this.setState({ checkmark: false, avatar_url: image })
        showMessage({
          message: "Successfully updated avatar!",
          type: "success",
        })
      })
      .catch(err => console.log(err))
  }

  // only update if at least one value changes
  updateInfo = (id) => async () => {
    const { name, graduation_date, major, phone_number, original_user } = this.state

    const update_user = { name, graduation_date, major, phone_number }

    if(JSON.stringify(update_user) !== JSON.stringify(original_user)) {
      await axiosInstance.patch(`/users/${id}`, update_user, tokenConfig())
      .then(() => {
          showMessage({
            message: "Successfully updated field!",
            type: "success",
          })
          this.setState({ original_user: update_user })
        }
      )
      .catch(err => console.log(err))
    }
  }

  original_user = ({ name, graduation_date, major, phone_number }) => {
    return { name, graduation_date, major, phone_number }
  }

  _toggle_going = () => {
    this.setState({ going_toggle: !this.state.going_toggle })
  }

  _toggle_bookmarked = () => {
    this.setState({ bookmark_toggle: !this.state.bookmark_toggle })
  }

  _toggle_created = () => {
    this.setState({ created_toggle: !this.state.created_toggle })
  }

  render() {
    const {
      name, email, graduation_date, major, avatar_url, phone_number, checkmark, image,
      going_toggle, bookmark_toggle, created_toggle
    } = this.state

    const {
      id, bookmarked_study_groups, created_study_groups, going_study_groups,
    } = this.props.user

    const { ...props } = this.props

    const owner = this.props.navigation.getParam('owner')

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.outmostContainer}>
          <View style={styles.insideContainer}>
          <TouchableOpacity onPress={this._pickImage}>
              <Image
                style={styles.profileImageStyle}
                source={{ uri: checkmark ? image : avatar_url }}
                defaultSource={require('../../../assets/default_profile_image.jpg')}
              />
            </TouchableOpacity>
            {
              checkmark ?
                <Button
                  onPress={this._onChangeAvatar}
                  icon={
                    <FontAwesomeIcon
                      name="check"
                      size={30}
                      color="green"
                    />
                  }
                  containerStyle={{ position: 'absolute', marginLeft: "25%", top: 0, left: 10 }}
                  type="clear"
                /> : null
            }
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
              <TextInput
                editable={owner}
                value={name}
                onChangeText={(name) => this.setState({ name })}
                onBlur={this.updateInfo(id)}
                style={{ fontSize: 22, marginBottom: 10 }}
                placeholder={owner ? 'Name' : '' }
              />
              <TextInput
                editable={false}
                value={email}
                onChangeText={(email) => this.setState({ email })}
                style={styles.inputContainerStyle}
              />
              <View style={{flexDirection: 'row'}}>
                { (owner || graduation_date) ? <Text>Class of </Text> : null }
                <TextInput
                  editable={owner}
                  value={graduation_date}
                  onChangeText={(graduation_date) => this.setState({ graduation_date })}
                  onBlur={this.updateInfo(id)}
                  style={styles.inputContainerStyle}
                  placeholder={owner ? 'Grad Year' : '' }
                />
              </View>

              <TextInput
                editable={owner}
                value={major}
                onChangeText={(major) => this.setState({ major })}
                onBlur={this.updateInfo(id)}
                style={styles.inputContainerStyle}
                placeholder={owner ? 'Major' : '' }
              />
              <TextInput
                editable={owner}
                value={phone_number}
                onChangeText={(phone_number) => this.setState({ phone_number })}
                onBlur={this.updateInfo(id)}
                style={styles.inputContainerStyle}
                placeholder={owner ? 'Phone number' : '' }
              />
            </View>


          </View>
        </SafeAreaView>
        <ScrollView style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={this._toggle_going} style={{ flexDirection: 'row'}}>
            <Icon
              name='keyboard-arrow-down'
              size={25}
            />
            <Text style={{ paddingTop: 3 }}>Going To Items:</Text>
          </TouchableOpacity>
          {going_toggle ?
            <FlatList
             data={going_study_groups}
             renderItem={({ item }) => <Item {...item} {...props} {...this.props.navigation} />}
             keyExtractor={(item, index) => index.toString()}
             {...props}
            /> : null
          }
          <TouchableOpacity onPress={this._toggle_bookmarked} style={{ flexDirection: 'row'}}>
            <Icon
              name='keyboard-arrow-down'
              size={25}
            />
            <Text style={{ paddingTop: 3 }}>Bookmarked Items:</Text>
          </TouchableOpacity>
          {bookmark_toggle ?
            <FlatList
             data={bookmarked_study_groups}
             renderItem={({ item }) => <Item {...item} {...props} {...this.props.navigation} />}
             keyExtractor={(item, index) => index.toString()}
             {...props}
            /> : null
          }
          <TouchableOpacity onPress={this._toggle_created} style={{ flexDirection: 'row'}}>
            <Icon
              name='keyboard-arrow-down'
              size={25}
            />
            <Text style={{ paddingTop: 3 }}>Created Items:</Text>
          </TouchableOpacity>
          {created_toggle ?
            <FlatList
             data={created_study_groups}
             renderItem={({ item }) => <Item {...item} {...props} {...this.props.navigation} />}
             keyExtractor={(item, index) => index.toString()}
             {...props}
            /> : null
          }

        </ScrollView>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  outmostContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  insideContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    margin: 10
  },
  inputContainerStyle: {
    marginBottom: 5
  },
  profileImageStyle: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: defaultImageSize / 2,
    width: defaultImageSize,
    height: defaultImageSize,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#b37e5c'
  }
})

const mapStateToProps = ({ user }) => ({
  user: user.user
})

export default connect(mapStateToProps, { getProfile })(ProfileScreen)