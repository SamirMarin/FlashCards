import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { lightGray, lightRed } from '../utils/colors'

class CreateQuiz extends Component {
  state = {
    title: "" 
  }

  handleTitleTextChange = (title) => {
    this.setState({ title })
  }

  handleSubmit = () => {
    alert("got it")
  }

  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={this.handleTitleTextChange}
          placeholder={"Title"}
        />
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.submitBtnText}> Create New Quiz  </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textinput: {
    width: 200,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: lightGray,
    shadowOpacity: 0.3,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
  },
  submitBtn: {
    backgroundColor: lightRed,
    padding: 10,
    borderRadius: 7,
    height: 50,
  },
  androidSubmitBtn: {
    backgroundColor: lightRed,
    padding: 10,
    borderRadius: 2,
    height: 70,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
})

export default CreateQuiz

