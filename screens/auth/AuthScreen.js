import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { login } from '../../actions/auth_actions'
import store from '../../store/'
import { loadToken } from '../../actions/auth_actions'

class AuthScreen extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  async componentDidMount() {
    await store.dispatch(loadToken())
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? 'main' : 'auth');
  };

  getInitialState = () => {
    const initialState = {
      email: '',
      password: '',
      emailEmpty: false,
      passwordEmpty: false,
      msg: ''
    }
    return initialState;
  }

  resetState = () => {
    this.setState(this.getInitialState())
  }

  onLogin = async () => {
    const { email, password } = this.state;

    // this.props.navigation.navigate('studyGroup');
    if(this.state.email != '') {
      if(this.state.password != '') {
        // this.resetState()
        await this.props.login({email, password})
        if(this.props.auth.isAuthenticated) {
          this.props.navigation.navigate('StudyGroup');
        } else {
          this.setState({ msg: this.props.error.msg.error })
        }

      } else {
          this.setState({
            passwordEmpty: true
          })
        }
      } else {
        this.setState({
          emailEmpty: true
        })
    }
  }

  regexCheck = () => {
    const regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    return regex.test(this.state.email)
  }

  onSignup = () => {
    this.props.navigation.navigate('signup');
  }

  onForgot = () => {
    this.props.navigation.navigate('forgot');
  }

  render() {
    const { signedup } = this.props.auth;

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
            Welcome Back!
          </Text>
          <Text
            style={styles.smallWecomeText}
          >
            Login to continue to SocialCode
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
        <Input
          placeholder='Password'
          secureTextEntry={true}
          leftIcon={
            <Icon
              name='lock-outline'
              size={25}
              color='#92A1B1'
            />
          }
          color='white'
          containerStyle={styles.inputStyle}
          inputStyle={{color: '#2A3C4E'}}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={password => this.setState({ password, passwordEmpty: false, emailEmpty: false })}
        >
        </Input>
        {this.state.msg ?
          <Text style={{color: 'red', paddingTop: 10, fontStyle: 'italic'}}>
            {this.state.msg}
          </Text> : null
        }
        {this.state.emailEmpty ?
          <Text style={{color: 'red', paddingTop: 10, fontStyle: 'italic'}}>
            Please fill out your email
          </Text> : null
        }
        {(!this.state.emailEmpty && this.state.passwordEmpty) ?
          <Text style={{color: 'red', paddingTop: 10, fontStyle: 'italic'}}>
            Please fill out your password
          </Text> : null
        }
        {signedup ?
          <Text style={{color: 'green', paddingTop: 15, fontStyle: 'italic', textAlign: 'center' }}>
            Successfully signed up, please check your email for confirmation link!
          </Text> : null}
        <Button
            containerStyle={styles.loginButtonStyle}
            title="Log In"
            buttonStyle={{backgroundColor: "#FF9F1C"}}
            titleStyle={{fontWeight: 'bold', fontSize: 16}}
            onPress={this.onLogin}
        />

        <View style={{alignItems: 'center', marginTop: 70}}>
          <Text
            style={styles.signupTextStyle}
            onPress={this.onSignup}
          >
            New user? Sign up
          </Text>
          <Text
            style={styles.forgotTextStyle}
            onPress={this.onForgot}
          >
            Forgot password?
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
    color: '#EFEFEF'
  },
  smallWecomeText: {
    fontSize: 16,
    color: '#EFEFEF'
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

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps, { login })(AuthScreen)