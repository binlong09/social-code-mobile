import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import Card from '../../../components/profile/Card'
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import NavigationService from '../../../services/NavigationService'

export default class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const isOwner = navigation.getParam('owner')
    const title = isOwner ? "Your Profile" : `${navigation.getParam('name')}'s Profile`
    return {
      title,
      headerRight:
        <Button
          onPress={async() => {
            await AsyncStorage.clear()
            navigation.navigate({ routeName: 'auth'})
          }}
          title="Logout"
          buttonStyle={{marginRight: 10}}
          type="clear"
        />

    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <SafeAreaView>
          <Button
            title="Logout"
            onPress={this.logout}
          />
        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({

})