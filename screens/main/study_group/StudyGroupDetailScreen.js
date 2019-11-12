import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image, FlatList, SafeAreaView } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import Post from '../../../components/study_group/Post'
import { HeaderBackButton } from "react-navigation";
import { connect } from 'react-redux'
import { getStudyGroupDetail } from '../../../actions/study_group/study_group_detail_actions'
import NavigationService from '../../../services/NavigationService'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class StudyGroupDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('study_group_name')
    const id = navigation.getParam('id')
    return {
      title,
      headerRight: (
        <Button
          onPress={() => NavigationService.navigate('NewStudyGroupPost', { id })}
          icon={
            <FontAwesomeIcon
              name="plus"
              size={25}
              color="#f98181"
            />
          }
          buttonStyle={{marginRight: 10}}
          type="clear"
        />
      ),
    };
  };

  constructor(props) {
    super(props)

    this.state ={
      toggle: false
    }
  }

  componentDidMount() {
    this.props.getStudyGroupDetail(this.props.navigation.getParam('id'))
  }

  _toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    const {
      id, class_code, professor_name, location, meeting_time, image_url,
      study_group_posts, going_count, study_group_name
    } = this.props.study_group_detail.study_group;

    const title = 'Study for exam 1'

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={this._toggle}>
          <View style={styles.titleContainerStyle}>
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
            {
              image_url ?
              <Image
                source={{ uri: image_url }}
                style={{ width: '100%', height: 200 }}
            />: null
            }

            <Input
              value={meeting_time}
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
                value={class_code}
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
                value={professor_name}
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
                value={location}
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
                value={`${going_count} going`}
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
            data={study_group_posts}
            renderItem={({ item }) => <Post {...item} {...this.props.navigation} title={study_group_name} />}
            keyExtractor={(item, index) => index.toString()}
            style={{ paddingTop: "3%"}}
          />
        </SafeAreaView>

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
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    width: "100%",
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
})

const mapStateToProps = state => ({
  study_group_detail: state.study_group_detail
})

export default connect(mapStateToProps, { getStudyGroupDetail })(StudyGroupDetailScreen)