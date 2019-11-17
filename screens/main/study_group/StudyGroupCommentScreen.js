import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Post from '../../../components/study_group/Post'
import Comment from '../../../components/study_group/Comment'
import { HeaderBackButton } from 'react-navigation'
import { getStudyGroupComments } from '../../../actions/study_group/study_group_comment_actions'
import { connect } from 'react-redux';
import { tokenConfig } from '../../../actions/auth_actions'
import { errorFormatter } from '../../../actions/errorActions'
import { axiosInstance } from '../../../services/client'
import "abortcontroller-polyfill";

class StudyGroupCommentScreen extends React.Component {
  controller = new AbortController();

  static navigationOptions = ({ navigation }) => {
    const title = `${navigation.getParam('name')}'s Post`
    return {
      title
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      content: null,
      image: null
    }
  }

  onCreate = (id) => async() => {
    const { content, image }  = this.state

    if(content == null) {
      return
    }

    const new_comment = {
      content,
      image_url: image
    }

    await axiosInstance.post(`/study_group_posts/${id}/study_group_comments`, new_comment, tokenConfig())
      .then(() => {
        this.props.getStudyGroupComments(id)
        this.setState({ content: null })
      })
      .catch(err => console.log(err))

  }

  componentWillUnmount() {
    this.controller.abort();
  }

  async componentDidMount() {
    this.props.getStudyGroupComments(this.props.navigation.getParam('id'))
  }

  render() {
    const { study_group_comments } = this.props.study_group_comments

    const id = this.props.navigation.getParam('id')

    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={study_group_comments}
          renderItem={({item}) => <Comment {...item} {...this.props.navigation} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={study_group_comments}
          style={{ width: "100%"}}
        />
        <Input
          containerStyle={styles.inputContainerStyle}
          inputStyle={{ fontSize: 14, paddingBottom: 5 }}
          placeholder="Write a comment..."
          onChangeText={(content) => this.setState({content})}
          value={this.state.content}
          rightIcon={
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', flex: 1 }}>
              {/* <Icon
                name='photo'
                size={20}
                color='#f98181'
                style={styles.iconStyle}
                onPress={this._pickImage}
              />
              <Icon
                name='camera'
                size={20}
                color='#f98181'
                style={styles.iconStyle}
              /> */}
              <Icon
                name='paper-plane'
                size={20}
                color='#f98181'
                style={styles.iconStyle}
                onPress={this.onCreate(id)}
              />
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  inputContainerStyle: {
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 5,
    borderColor: 'gray',
    width: "95%",
    paddingLeft: 5
  },
  iconStyle: {
    paddingBottom: 10,
    paddingLeft: 10
  }
})

const mapStateToProps = state => ({
  study_group_comments: state.study_group_comments
})

export default connect(mapStateToProps, { getStudyGroupComments })(StudyGroupCommentScreen)