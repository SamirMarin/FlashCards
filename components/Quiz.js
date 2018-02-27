import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'



class Quiz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Quiz goes on this page </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Quiz
