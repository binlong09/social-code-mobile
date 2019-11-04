import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

const defaultImageSize = 36;

export default class Comment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { content, image_url, name, profile_image_url, created_at } = this.props

    return (
      <View style={styles.outmostContainer}>
        <View style={styles.insideContainer}>
          <Image
            style={styles.profileImageStyle}
            source={{ uri: profile_image_url }}
            defaultSource={require('../../assets/empty_image.png')}
          />
          <View style={styles.postWrapStyle}>
            <View style={styles.postContentStyle}>
              <Text style={styles.nameTextStyle}>{name}</Text>
              <Text style={styles.contentStyle}>{content}</Text>
              {image_url ?
                <Image
                  source={{ uri: image_url }}
                  style={{ width: "80%", height: 150, marginBottom: 3 }}
                /> : null
              }
            </View>
            <Text style={styles.createdAtTextStyle}>{created_at}</Text>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outmostContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%"
  },
  insideContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3
  },
  profileImageStyle: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: defaultImageSize / 2,
    width: defaultImageSize,
    height: defaultImageSize,
    marginRight: 5
  },
  postWrapStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: defaultImageSize / 12,
  },
  postContentStyle: {
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: '#f2f2f2',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8
  },
  contentStyle: {
    fontSize: 13,
    paddingBottom: 3,
    paddingLeft: 3
  },
  nameTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 3,
    paddingBottom: 3
  },
  createdAtTextStyle: {
    fontSize: 12,
    paddingLeft: 3,
    paddingTop: 3,
    fontWeight: '200'
  }
})