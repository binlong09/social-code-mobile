import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';

const defaultImageSize = 36;

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentModalVisible: false,
      imageModalVisible: false
    }
  }

  render() {
    const post_image_url = 'https://2.bp.blogspot.com/-gc526LRDxEM/XMGe9dFh2oI/AAAAAAAAPX4/FBrAifdw3XgJaC3xQ6HtdN1MADML1BjywCEwYBhgL/s1600/IMG_0038.jpg'
    const profile_image_url = 'http://www.gstatic.com/tv/thumb/persons/189825/189825_v9_bc.jpg'

    return(
      <View style={styles.outmostContainer}>
        <View style={styles.insideContainer}>
          <Image
            style={styles.profileImageStyle}
            source={{ uri: profile_image_url }}
            defaultSource={require('../../assets/empty_image.png')}
          />
          <View style={styles.userInfoContainerStyle}>
            <Text style={styles.nameTextStyle}>Nghia Dang</Text>
            <Text style={styles.createdAtTextStyle}>May 22 at 8:44 AM</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Here is the answer for review question 10
        </Text>
        <Image
          resizeMode="contain"
          style={styles.postImageStyle}
          source={{ uri: post_image_url }}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({
              commentModalVisible: !this.state.commentModalVisible
            });
          }}
        >
          <Text style={styles.commentNumberStyle}>
            2 comments
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  outmostContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: "2%",
  },
  insideContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.8,
    paddingTop: 10,
    paddingBottom: 8
  },
  userInfoContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: defaultImageSize / 8
  },
  profileImageStyle: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: defaultImageSize / 2,
    width: defaultImageSize,
    height: defaultImageSize,
    marginRight: 5
  },
  nameTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 3
  },
  createdAtTextStyle: {
    fontSize: 12,
    paddingLeft: 3,
    paddingTop: 3,
    fontWeight: '200'
  },
  postImageStyle: {
    aspectRatio: 1,
    width: "100%",
    marginTop: "3%",
    marginBottom: 10,
  },
  commentNumberStyle: {
    opacity: 0.8,
    color: '#3b5998'
  }
})