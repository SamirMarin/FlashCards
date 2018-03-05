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
import { NavigationActions } from 'react-navigation'

class CreateQuiz extends Component {
  state = {
    title: ""
  }

  handleTitleTextChange = (title) => {
    this.setState({ title })
  }

  handleSubmit = () => {
    const { title } = this.state
    const { quizzes, addQuiz } = this.props
    if (title === '') {
      alert("Don't forget to enter a title for your new quiz!")

    } else if (quizzes[title]){
      alert("You alredy have a quiz with this name")

    } else {
      const quizData = {
        title,
        questions: []
      }

      addNewQuiz({ key: title, quizData: quizData })
        .then(() => {
          addQuiz({ key: title, quizData: quizData })
          this.toQuizzesPage()
          this.toQuizPage(title)
        })
        .catch((err) => console.log(err))

      this.setState({ title: ""})
    }
  }

  toQuizzesPage = () => {
    const backAction = NavigationActions.back({
      key: 'CreateQuiz', 
    })
    this.props.navigation.dispatch(backAction)
  }

  toQuizPage = ( title ) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Quiz',
      params: { title },
      key: 'Quizzes',
    })
    this.props.navigation.dispatch(navigateAction)

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
              value={this.state.title}
            />
            <View style={styles.btnView}>
              <TouchableOpacity 
                style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                onPress={this.handleSubmit}
              >
                <Text style={styles.submitBtnText}> Create New Quiz  </Text>
              </TouchableOpacity>
            </View>
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
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  btnView: {
    paddingLeft: 20,
    paddingRight: 20,
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

