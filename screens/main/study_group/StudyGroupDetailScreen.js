import React, { Component } from "react";
import { View, Text } from 'react-native';

export default class StudyGroupDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('class_code', 'Study Group Detail Screen'),
    };
  };

  render() {
    return (
      <View>
        <Text>Hello there</Text>
      </View>
    )
  }
}