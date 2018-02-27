import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { lightGray, lightRed, black } from '../utils/colors'
import { addQuiz } from '../actions'
import { connect } from 'react-redux'
import { addNewQuiz } from '../utils/api'

class CreateQuiz extends Component {
  state = {
    title: ""
  }

  handleTitleTextChange = (title) => {
    this.setState({ title })
  }

  handleSubmit = () => {
    const { title } = this.state
    const { quizzes } = this.props
    if (quizzes[title]){
      alert("You alredy have a quiz with this name")

    } else {
      const quizData = {
        title,
        questions: []
      }

      //TODO only add to state if local db success
      //save to local phone db
      addNewQuiz({ key: title, quizData: quizData})
      //
      //save to redux
      this.props.addQuiz({ key: title, quizData: quizData })
    }

  }

  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView style={styles.outerContainer} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.text}>What will be the title of your new Quiz?!</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={this.handleTitleTextChange}
              placeholder={"Title"}
            />
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={this.handleSubmit}
            >
              <Text style={styles.submitBtnText}> Create New Quiz  </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Platform.OS === 'ios' ? 0 : 10,
    paddingRight: Platform.OS === 'ios' ? 0 : 10,
  },
  textinput: {
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
    height: 50,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    color: black,
    fontSize: 30,
    textAlign: 'center',
  }
})

function mapStateToProps( quizzes ) {
  return {
    quizzes
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addQuiz: (data) => dispatch(addQuiz(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)

