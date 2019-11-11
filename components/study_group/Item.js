import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button } from 'react-native-elements';
import { tokenConfig } from '../../actions/auth_actions'
import { axiosInstance } from '../../services/client'

const defaultImageSize = 136;

export default class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isGoing: this.props.going,
      isLoading: false
    }
  }

  onCancel = (id) => async() => {
    this.setState({ isLoading: true })

    const token = tokenConfig()

    await axiosInstance.get(`/study_groups/${id}/not_going`, token)
      .then(() => this.setState({ isGoing: !this.state.isGoing, isLoading: false }))
      .catch(err => console.log(err))
  }

  onAccept = (id) => async() => {
    this.setState({ isLoading: true })

    const token = tokenConfig()

    await axiosInstance.get(`/study_groups/${id}/going`, token)
      .then(() => this.setState({ isGoing: !this.state.isGoing, isLoading: false }))
      .catch(err => console.log(err))
  }

  render() {
    const {
      id, class_code, professor_name, location,
      meeting_time, going_count, image_url,
    } = this.props;

    const { isGoing, isLoading } = this.state;

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('StudyGroupDetail', { class_code: class_code })}>
          <Image style={styles.image} source={{uri: image_url}} />
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Text style={{ fontSize:20, paddingBottom: 5, paddingTop: 5 }}>{class_code}</Text>
            <Text style={styles.textStyle}>{professor_name}</Text>
            <Text style={styles.textStyle}>{location}</Text>
            <Text style={styles.textStyle}>{meeting_time}</Text>
            {isLoading ?
              <ActivityIndicator size="large" color="#e28e1d" /> :
              (isGoing ?
                <Button onPress={this.onCancel(id)} buttonStyle={styles.goingButtonStyle} title={"Accepted!"}/> :
                <Button onPress={this.onAccept(id)} buttonStyle={styles.notGoingbuttonStyle} title={"Going?"}/>)
            }
            <Text style={styles.textStyle}>With {going_count} others</Text>
          </View>
        </TouchableOpacity>
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
    marginTop: 10
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
  goingButtonStyle: {
    width: "80%",
    backgroundColor: '#e28e1d',
    marginBottom: 10,
    borderRadius: 10
  },
  notGoingbuttonStyle: {
    width: "80%",
    backgroundColor: '#5663a9',
    marginBottom: 10,
    borderRadius: 10
  }
});