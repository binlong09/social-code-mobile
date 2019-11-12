import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';

const defaultImageSize = 36;

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentModalVisible: false,
      imageModalVisible: false,
    }
  }

  componentDidMount() {
    // Get the size of the web image
    if(this.props.image_url) {
      Image.getSize(this.props.image_url, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const {
      title, content, image_url, comments_count, created_at
    } = this.props

    const {
      user_id, name, avatar_url
    } = this.props.user

    const aspect = this.state.width / this.state.height || 1;

    return(
      <View style={styles.outmostContainer}>
        <View style={styles.insideContainer}>
          <Image
            style={styles.profileImageStyle}
            source={{ uri: avatar_url }}
            defaultSource={require('../../assets/empty_image.png')}
          />
          <View style={styles.userInfoContainerStyle}>
          <Text style={styles.nameTextStyle}>{name}</Text>
            <Text style={styles.createdAtTextStyle}>{created_at}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{content}</Text>
        <ScrollView
        maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {
            image_url ?
              <Image
              resizeMode="contain"
              style={{
                aspectRatio: aspect,
                width: "100%",
                marginTop: "3%",
                marginBottom: 10,
              }}
              source={{ uri: image_url }}
            /> : null
          }
        </ScrollView>
        <TouchableOpacity
          style={{ marginBottom: 2, alignItems: 'flex-end' }}
          onPress={() => this.props.navigate('StudyGroupComment', { name })}
        >
          <Text style={styles.commentNumberStyle}>{comments_count} comments</Text>
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
    marginBottom: "2%"
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
    paddingBottom: 3
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
  commentNumberStyle: {
    opacity: 0.8,
    color: '#3b5998'
  }
})