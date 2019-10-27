import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

const defaultImageSize = 120;

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Default Title'
    }
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 32 }}>
          SOCIAL
        </Text>
        <Text style={{ fontSize: 32 }}>
          CODE
        </Text>
        <TouchableOpacity
          style={styles.touchableContainer}
        >
          <Image style={styles.image} source={require('../../assets/logo.png')} />
          <Input
            type="text"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: defaultImageSize / 2,
    width: defaultImageSize,
    height: defaultImageSize,
    margin: 10
  },
})

export default Card;