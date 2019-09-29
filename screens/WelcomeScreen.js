import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class WelcomeScreen extends Component {
  onGetStarted = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <LinearGradient
        // colors={['#304768','#374A6A','#3C4D6C','#3F4E6D','#414E6D','#465170']}
        colors={['#fac198','#ebb798','#e3b398','#c49f98','#ab9198','#928197','#847898']}
        style={styles.container}>
        <Image
          // source={require('../assets/logoFull.png')}
          source={require('../assets/social_code.png')}
          style={styles.logo}
        />
        <View style={{marginBottom: 50}}>
          <Text
            style={styles.welcomeText}
          >
            APP FOR{"\n"}
            STUDENTS{"\n"}
            BY STUDENTS{"\n"}
          </Text>
          <Button
            style={styles.buttonStyle}
            title="Get Started"
            buttonStyle={{backgroundColor: "#FF9F1C"}}
            onPress={this.onGetStarted}
          />
        </View>
      </LinearGradient>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    height: 150
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#EFEFEF',
    marginLeft: 30
  },
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: "85%",
    marginBottom: 50,
    borderRadius: 20
  }
}