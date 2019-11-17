import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { tokenConfig } from '../../actions/auth_actions'
import { axiosInstance } from '../../services/client'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const defaultImageSize = 136;
const shortStringCutoff = 16;
const longStringCutoff = 30;

export default class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isGoing: this.props.going,
      isLoading: false,
      going_count: this.props.going_count,
      bookmark_color: 'gray',
      owned: false,
    }
  }

  onCancel = (id) => async() => {
    this.setState({ isLoading: true })

    const token = tokenConfig()

    const { isGoing, going_count } = this.state

    await axiosInstance.get(`/study_groups/${id}/not_going`, token)
      .then(() => this.setState({
        isGoing: !isGoing,
        isLoading: false,
        going_count: going_count == 0 ? 0 : going_count - 1
      }))
      .catch(err => console.log(err))
  }

  onAccept = (id, owned) => async() => {
    this.setState({ isLoading: true })

    const token = tokenConfig()

    const { isGoing, going_count } = this.state

    await axiosInstance.get(`/study_groups/${id}/going`, token)
      .then(() => this.setState({
        isGoing: !isGoing,
        isLoading: false,
        going_count: owned ? going_count : going_count + 1
      }))
      .catch(err => console.log(err))
  }

  handleBookmark = () => {
    const { bookmark_color } = this.state
    if(bookmark_color == 'gray') {
      this.setState({ bookmark_color: '#f98181'})
    } else {
      this.setState({ bookmark_color: 'gray' })
    }

  }

  onRemoveBookmark = () => {
    this.setState({ bookmark_color: '#5663a9' })
  }

  shortStringProcessor = (string) => {
    if(string.length >= shortStringCutoff) {
      string = `${string.substring(0, shortStringCutoff).trim()}... `
    }
    return string
  }

  longStringProcessor = (string) => {
    if(string.length >= longStringCutoff) {
      string = `${string.substring(0,longStringCutoff).trim()}... `
    }
    return string
  }

  render() {
    const {
      id, class_code, professor_name, location,
      meeting_time, image_url, study_group_name, owned
    } = this.props;

    const { isGoing, isLoading, going_count } = this.state;

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('StudyGroupDetail', { study_group_name, id })}>
          <Image
            style={styles.image}
            source={{uri: image_url}}
            defaultSource={require('../../assets/no_image_available.png')}
          />
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Text style={{ fontSize:20, paddingBottom: 5, paddingTop: 5 }}>{this.shortStringProcessor(study_group_name)}</Text>
            <Text style={styles.textStyle}>{this.longStringProcessor(`${professor_name}, ${class_code}`)}</Text>
            <Text style={styles.textStyle}>{this.longStringProcessor(location)}</Text>
            <Text style={styles.textStyle}>{meeting_time}</Text>
            <View style={styles.buttonContainer}>
            {isLoading ?
              <ActivityIndicator size="large" color="#e28e1d" /> :
                (isGoing ?
                  <Button onPress={this.onCancel(id, owned)} buttonStyle={styles.goingButtonStyle} title={"Accepted!"}/> :
                  <Button onPress={this.onAccept(id, owned)} buttonStyle={styles.notGoingbuttonStyle} title={"Going?"}/>)
            }

            </View>
            <Text style={styles.goingTextStyle}>With {going_count} others</Text>
          </View>
        </TouchableOpacity>
        <Button
            onPress={this.handleBookmark}
            icon={
              <FontAwesomeIcon
                name="bookmark"
                size={30}
                color={this.state.bookmark_color}
              />
            }
            containerStyle={{ position: 'absolute', right: 0, marginRight: 10 }}
            type="clear"
        />
        {owned ?
        <Button
          icon={
            <Icon
              name="more-vert"
              size={30}
              type="material"
              color="black"
            />
          }
          containerStyle={{ position: 'absolute', bottom: 0, right: 2, marginBottom: "1%" }}
          type="clear"
        />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: defaultImageSize / 2,
    width: defaultImageSize,
    height: defaultImageSize,
    margin: 10
  },
  textStyle: {
    paddingBottom: 5
  },
  goingTextStyle: {
    paddingBottom: 1
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flex: 1
  },
  goingButtonStyle: {
    width: "80%",
    backgroundColor: '#f98181', //#e28e1d
    marginBottom: 5,
    borderRadius: 7,
  },
  notGoingbuttonStyle: {
    width: "80%",
    backgroundColor: '#5663a9',
    marginBottom: 5,
    borderRadius: 7
  }
});