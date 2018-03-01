import React, { Component } from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  Platform, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { lightGray, lightRed, black } from '../utils/colors'
import { addQuestion } from '../actions' 
import { connect } from 'react-redux'
import { addQuestionToQuiz } from '../utils/api'

class AddQuizCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleQuestionChange = (question) => {
    this.setState({ question })
  }

  handleAnswerChange = (answer) => {
    this.setState({ answer })
  }

  handleOnSubmit(title) {
    const { question, answer } = this.state
    const { addQuestion, goBack } = this.props
    const questionObj = {
      question,
      answer,
    }

    //TODO need to handle add to state on db non failure
    addQuestion({ key: title, question: questionObj })
    addQuestionToQuiz({ key: title, question: questionObj })
    goBack()
  }

  static navigationOptions = () => {
    return {
      title: "Add Quiz Card"
    }
  }

  render() {
    const { title } = this.props.navigation.state.params
    return (
      <KeyboardAvoidingView style={styles.outerContainer} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.text}> { title } </Text>
            <TextInput
              style={styles.textinput}
              onChangeText={this.handleQuestionChange}
              placeholder={"Question?"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={this.handleAnswerChange}
              placeholder={"Answere..."}
            />
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={() => this.handleOnSubmit(title)}
            >
              <Text style={styles.submitBtnText}> Add Card </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
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
  },
})

function mapDispatchToProps( dispatch, { navigation } ) {
  return {
    addQuestion: (data) => dispatch(addQuestion(data)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddQuizCard)
