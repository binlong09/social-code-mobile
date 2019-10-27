import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { Text, Input, Icon } from 'react-native-elements';

export default class StudyGroupDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('class_code', 'Study Group Detail Screen'),
    };
  };

  constructor(props) {
    super(props)

    this.state ={
      toggle: false
    }
  }

  _toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    const image_uri = "https://images.localist.com/photos/741746/big_square@2x/b8513b1fdde055487274e639463fe5431b4b3569.jpg"

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._toggle}>
          <View style={styles.titleContainerStyle}>
            <Text h4={true} style={{ paddingBottom: 5 }}>
              Study for Exam 1
            </Text>
            <Icon
              name='keyboard-arrow-down'
              size={22}
              color='black'
              style={{ alignSelf: 'center' }}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.state.toggle ?
          <View style={{ width: '100%', paddingTop: 10 }}>
            <Image
              source={{ uri: image_uri }}
              defaultSource={require('../../../assets/empty_image.png')}
              style={{ width: '100%', height: 200 }}
            />
            <Input
              value={"October 15th 2019, 08:00 pm"}
              inputContainerStyle={styles.inputContainerStyle}
              leftIcon={
                <Icon
                  name='date-range'
                  size={18}
                  color='black'
                />
              }
              inputStyle={{ fontSize: 14 }}
              leftIconContainerStyle={{ paddingRight: "2%" }}
              editable={false}
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Input
                value={"CS 231"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='class'
                    size={18}
                    color='black'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
              <Input
                value={"Professor Kim"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='person'
                    size={18}
                    color='black'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Input
                value={"Glatfelter 001"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='location-on'
                    size={18}
                    color='black'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
              <Input
                value={"8 going"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='group'
                    size={18}
                    color='black'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
          </View>
          : null}
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
    marginRight: "5%"
  },
  titleContainerStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
})