import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';

const defaultImageSize = 136;

export default class Item extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log(this.props)
    const { class_code, professor_name, location, meeting_time, going_count, going, image_url } = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigate('StudyGroupDetail', { class_code: class_code })}>
          <Image style={styles.image} source={{uri: image_url}} />
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Text style={{ fontSize:20, paddingBottom: 5, paddingTop: 5 }}>{class_code}</Text>
            <Text style={styles.textStyle}>{professor_name}</Text>
            <Text style={styles.textStyle}>{location}</Text>
            <Text style={styles.textStyle}>{meeting_time}</Text>
            {going ?
              <Button buttonStyle={styles.goingButtonStyle} title={"Accepted!"}/>:
              <Button buttonStyle={styles.notGoingbuttonStyle} title={"Going?"}/>
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
