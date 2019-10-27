import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import Card from '../../../components/profile/Card'
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
  }

  logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('auh')
  }

  render() {
    return (
      // <LinearGradient
      //   colors={['#fac198','#ebb798','#e3b398','#c49f98','#ab9198','#928197','#847898']}
      //   style={{ flex: 1 }}>
      // >
        <SafeAreaView>
          {/* <Card /> */}
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