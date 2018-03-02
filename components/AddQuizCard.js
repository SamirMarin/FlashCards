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

    addQuestionToQuiz({ key: title, question: questionObj })
      .then(() => {
        addQuestion({ key: title, question: questionObj })
        goBack()
      })
      .catch((err) => console.log(err))
  }

  static navigationOptions = {
    title: "Add Card",
    headerTitleStyle: { fontSize: 25 },
  }

  render() {
    const { title } = this.props.navigation.state.params
    return (
      <KeyboardAvoidingView style={styles.outerContainer} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container } >
            <Text style={styles.text}> { title } </Text>
            <View>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textinput}
                  onChangeText={this.handleQuestionChange}
                  placeholder={"Question?"}
                />
              </View>
              <TextInput
                style={styles.textinput}
                onChangeText={this.handleAnswerChange}
                placeholder={"Answer..."}
              />
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity 
                style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                onPress={() => this.handleOnSubmit(title)}
              >
                <Text style={styles.submitBtnText}> Add Card </Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Platform.OS === 'ios' ? 20 : 20,
    paddingRight: Platform.OS === 'ios' ? 20 : 20,
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
  btnView: {
    paddingLeft: 20,
    paddingRight: 20,
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
  textInputView: {
    paddingBottom: 20,
  }
})

function mapDispatchToProps( dispatch, { navigation } ) {
  return {
    addQuestion: (data) => dispatch(addQuestion(data)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddQuizCard)
