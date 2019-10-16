import React, { Component } from 'react'
import {
  StyleSheet, Text, View, SafeAreaView, AsyncStorage,
  LayoutAnimation, RefreshControl
} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { logout } from '../../../actions/auth_actions'
import { connect } from 'react-redux';
import List from '../../../components/study_group/List';
import NavigationService from '../../../services/NavigationService'

class StudyGroupScreen extends Component {
  static navigationOptions = {
    headerLeft: (
      <Button
        onPress={() => NavigationService.navigate('NewStudyGroup')}
        icon={
          <Icon
            name="plus"
            size={25}
            color="#f98181"
          />
        }
        buttonStyle={{marginLeft: 10}}
        type="clear"
      />
    )
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.fetchToken();
  }

  getInitialState = () => {
    const initialState = {
      token: ''
    }
    return initialState
  }

  fetchToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token })
  }

  onLogout = async () => {
    await this.props.logout();
    const token = await AsyncStorage.getItem('token');
    if(token == null) {
      this.props.navigation.navigate('auth')
    }
  }

  render() {
    const { ...props } = this.props;

    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <List
          refreshControl={
            <RefreshControl
              // refreshing={this.state.loading}
              // onRefresh={this._onRefresh}
            />
          }
          // onPressFooter={this.onPressFooter}
          // data={this.state.posts}
          {...props}
        />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10
  },
  safeArea: {
    flex: 1,
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(StudyGroupScreen)