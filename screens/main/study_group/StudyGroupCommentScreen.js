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

const comments = [
  {
    id: 1,
    content: 'This is very helpful. Thanks Shia!',
    image_url: null,
    name: 'Kanye East',
    profile_image_url: 'https://images.complex.com/complex/image/upload/c_limit,dpr_auto,q_90,w_720/fl_lossy,pg_1/kanye-lookalike_gk7c1q.jpg',
    created_at: '1w'
  },
  {
    id: 2,
    content: "Thanks Shia. Let's do this!",
    image_url: 'https://i.ytimg.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
    name: 'Chris Pratt',
    profile_image_url: 'https://i.pinimg.com/originals/4d/84/28/4d84280dba0d5131c3b48832e70f858f.jpg',
    created_at: '2d'
  }
]

class StudyGroupCommentScreen extends React.Component {
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

  async componentDidMount() {
    const myData = this.props.getStudyGroupComments(this.props.navigation.getParam('id'))
    this.setState({ study_group_comments: myData })
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
          update
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