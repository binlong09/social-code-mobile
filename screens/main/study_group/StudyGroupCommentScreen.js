import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native'
import Post from '../../../components/study_group/Post'
import Comment from '../../../components/study_group/Comment'

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

export default class StudyGroupCommentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Study Group Comment Screen'),
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={comments}
          renderItem={({item}) => <Comment {...item} {...this.props.navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          style={{height: 30, borderWidth: 1, borderRadius: 10, marginBottom: 15, marginLeft: 10, marginRight: 5, borderColor: 'gray', width: "95%", paddingLeft: 5}}
          placeholder="Write a comment..."

          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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
  }
})
