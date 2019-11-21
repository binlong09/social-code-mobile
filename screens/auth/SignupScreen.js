import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth_actions';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      success: false,
      msg: '',
      loading: false,
      name: '',
      email: '',
      password: ''
    }
    return initialState;
  }

  resetState = () => {
    this.setState(this.getInitialState);
  }

   onSignup = async () => {
    const { email, name, password } = this.state;

    await this.props.signup({name, email, password});
    if(this.props.auth.signedup) {
      this.props.navigation.navigate('auth');
    } else {
      this.setState({ msg: this.props.error.msg.errors[0]})
    }
  }

  onSignin = () => {
    this.setState({
      success: false
    })
    this.props.navigation.navigate('auth');
  }

  onForgot = () => {
    this.props.navigation.navigate('forgot');
  }

  render() {
    const { isLoading } = this.props.auth;

    return (
      <ImageBackground
        // colors={['#304768','#374A6A','#3C4D6C','#3F4E6D','#414E6D','#465170']}
        source={require('../../assets/gradient-background.png')}
        style={styles.container}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={{alignItems: 'center', marginTop: 80}}>
          <Text
            style={styles.bigWelcomeText}
          >
            Welcome!
          </Text>
          <Text
            style={styles.smallWecomeText}
          >
            Please register to continue
          </Text>
        </View>
        <Input
          placeholder='Username'
          leftIcon={
            <Icon
              name='account'
              size={25}
              color='#92A1B1'
            />
          }
          color='white'
          containerStyle={styles.inputStyle}
          inputStyle={{color: '#2A3C4E'}}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={name => this.setState({ name })}
        >
        </Input>
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
          onChangeText={email => this.setState({ email })}
        >
        </Input>
        <Input
          placeholder='Password'f
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
          onChangeText={password => this.setState({ password })}
        >
        </Input>
        {isLoading ?
          <ActivityIndicator size="large" color="#f4b20b" style={{paddingTop: 10}}/> : null
        }
        {this.state.msg ?
          <Text style={{color: 'red', paddingTop: 10, fontStyle: 'italic'}}>
            {this.state.msg}
          </Text> : null
        }
        <Button
          containerStyle={styles.signupButtonStyle}
          title="Sign Up"
          buttonStyle={{backgroundColor: "#FF9F1C"}}
          titleStyle={{fontWeight: 'bold', fontSize: 16}}
          onPress={this.onSignup}
        />
        <View style={{alignItems: 'center', marginTop: 70}}>
          <Text
            style={styles.signinTextStyle}
            onPress={this.onSignin}
          >
            Already had an account? Sign in.
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
  signupButtonStyle: {
    marginTop: 20,
    width: "85%",
    borderRadius: 30
  },
  signinTextStyle: {
    color: '#FF9F1C',
    fontSize: 13
  },
  forgotTextStyle: {
    paddingTop: 5,
    color: '#BCC2CD',
    fontSize: 12
  },
  successUpperText: {
    color: '#EFEFEF',
    fontSize: 12
  },
  successBottomText: {
    color: '#FF9F1C',
    fontSize: 12
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps, {
  signup,
  clearErrors
})(SignupScreen);