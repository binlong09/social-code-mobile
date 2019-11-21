import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { errorFormatter } from '../../actions/errorActions';
import { axiosInstance } from '../../services/client'

export default class ForgotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error_msg: '',
      success_msg: ''
    }
  }

  onForgot = async () => {
    const { email } = this.state

    if(!email) {
      this.setState({ error_msg: 'Please fill out your email' })
      return
    }

    await axiosInstance.get(`/users/recover_password?email=${email}`)
      .then(() => this.setState({ success_msg: 'Password reset instructions sent. Check your email' }))
      .catch(err => this.setState({ error_msg: errorFormatter(err.response.data.error) }))
  }

  render() {
    const { navigation } = this.props

    return (
      <ImageBackground
      source={require('../../assets/gradient-background.png')}
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={{alignItems: 'center', marginTop: 60}}>
        <Text
          style={styles.bigWelcomeText}
        >
          Forgot Password?
        </Text>
        <Text style={styles.smallWecomeText}>
          Enter your email below to get instructions
        </Text>
        <Text style={styles.smallWecomeText}>
          to reset your password
        </Text>
      </View>
      <Input
        placeholder='Email'
        leftIcon={
          <Icon
            name='email-outline'
            size={25}
            color='#92A1B1'
          />
        }
        color='white'
        containerStyle={styles.inputStyle}
        inputStyle={{color: '#2A3C4E'}}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        onChangeText={email => this.setState({ email, passwordEmpty: false, emailEmpty: false })}
      >
      </Input>
      {this.state.error_msg ?
        <Text style={{color: 'red', paddingTop: 5, fontStyle: 'italic'}}>
          {this.state.error_msg}
        </Text> : null
      }
      {this.state.success_msg ?
        <Text style={{color: 'green', paddingTop: 5, fontStyle: 'italic'}}>
          {this.state.success_msg}
        </Text> : null
      }
      <Button
          containerStyle={styles.loginButtonStyle}
          title="Submit"
          buttonStyle={{backgroundColor: "#FF9F1C"}}
          titleStyle={{fontWeight: 'bold', fontSize: 16}}
          onPress={this.onForgot}
      />
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text
          style={styles.signupTextStyle}
          onPress={() => navigation.navigate('signup')}
        >
          New user? Sign up!
        </Text>
        <Text
          style={styles.forgotTextStyle}
          onPress={() => navigation.navigate('auth')}
        >
          Got your credentials? Sign in!
        </Text>
      </View>
    </ImageBackground>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    height: 150
  },
  bigWelcomeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#EFEFEF',
    marginBottom: 5
  },
  smallWecomeText: {
    fontSize: 16,
    color: '#EFEFEF',
    alignContent: 'center'
  },
  inputStyle: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20
  },
  leftIconContainerStyle: {
    paddingTop: 3,
    marginLeft: 10,
    marginRight: 10
  },
  loginButtonStyle: {
    marginTop: 20,
    width: "85%",
    borderRadius: 30
  },
  signupTextStyle: {
    color: '#FF9F1C',
    fontSize: 13
  },
  forgotTextStyle: {
    paddingTop: 5,
    color: '#BCC2CD',
    fontSize: 12
  }
}
