import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';

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
    const profile_image_url = 'https://shawetcanada.files.wordpress.com/2019/10/shia-labeouf.jpg?quality=80&strip=all&w=720&h=480&crop=1'
    const { title } = this.props

    return(
      <View style={styles.outmostContainer}>
        <View style={styles.insideContainer}>
          <Image
            style={styles.profileImageStyle}
            source={{ uri: profile_image_url }}
            defaultSource={require('../../assets/empty_image.png')}
          />
          <View style={styles.userInfoContainerStyle}>
            <Text style={styles.nameTextStyle}>Shia Labeouf</Text>
            <Text style={styles.createdAtTextStyle}>May 22 at 8:44 AM</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Here is the review question for exam 1. DO IT!
        </Text>
        <ScrollView maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            style={styles.postImageStyle}
            source={{ uri: post_image_url }}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigate('StudyGroupComment', { title: title })}
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