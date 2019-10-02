import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

export default class StudyGroupScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Study Group</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#ddd'
  }
})