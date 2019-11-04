import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import { Text, Input, Icon, Tile } from 'react-native-elements';
import Post from '../../../components/study_group/Post'

const posts = [
  {
    id: 1,
    image_url: "https://images.localist.com/photos/746192/huge/039c008e2501b5024e16245536c29d9028451ca0.jpg",
    professor_name: "Professor Kim",
    location: "Glat 112",
    meeting_time: "Tuesday 8:00PM",
    class_code: "CS 216",
    going: true,
    going_count: 12
  },
]

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
    const image_uri = "https://images.localist.com/photos/746192/huge/039c008e2501b5024e16245536c29d9028451ca0.jpg"
    const title = 'Study for exam 1'

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._toggle}>
          <View style={styles.titleContainerStyle}>
            <Text h4={true} style={{ paddingBottom: 5 }}>
              {title}
            </Text>
            <Icon
              name='keyboard-arrow-down'
              size={22}
              color='#3b5998'
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
                  color='#3b5998'
                />
              }
              inputStyle={{ fontSize: 14 }}
              leftIconContainerStyle={{ paddingRight: "2%" }}
              editable={false}
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Input
                value={"CS 216"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='class'
                    size={18}
                    color='#3b5998'
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
                    color='#3b5998'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Input
                value={"Glatfelter 112"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='location-on'
                    size={18}
                    color='#3b5998'
                  />
                }
                inputStyle={{ fontSize: 14 }}
                leftIconContainerStyle={{paddingRight: "2%"}}
                editable={false}
              />
              <Input
                value={"12 going"}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ flex: 1 }}
                leftIcon={
                  <Icon
                    name='group'
                    size={18}
                    color='#3b5998'
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
          <FlatList
            data={posts}
            renderItem={({item}) => <Post {...this.props.navigation} title={title} />}
            keyExtractor={(item, index) => index.toString()}
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