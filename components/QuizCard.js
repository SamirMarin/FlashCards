import React, { Component } from 'react'
import { 
  StyleSheet, 
  View, 
  Text, 
  Platform, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Dimensions,
} from 'react-native'
import { lightGray, lightRed, black, darkGray, lightGreen } from '../utils/colors'
import { connect } from 'react-redux'
import { mainFont, ansFont } from '../utils/helpers'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { getIcon, removeLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizCard extends Component {
  state = {
    cardIndex: 0,
    answer: false,
    numCorrect: 0,
    iosEye: 'ios-eye',
    androidEye: 'md-eye',
  }

  componentDidMount () {
    removeLocalNotification()
      .then(setLocalNotification)
  }

  flipCard = () => {
    this.setState((state) => ({
      answer: !state.answer,
      iosEye: state.answer ? 'ios-eye' : 'ios-eye-off',
      androidEye: state.answer ? 'md-eye' : 'md-eye-off',
      }
    ))
  }

  correct = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      numCorrect: state.numCorrect + 1,
      answer: false,
      iosEye: 'ios-eye',
      androidEye: 'md-eye',
    }))
  }

  incorrect = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      answer: false,
      iosEye: 'ios-eye',
      androidEye: 'md-eye',
    }))
  }

  restartQuiz = () => {
    this.setState({
      cardIndex: 0,
      answer: false,
      numCorrect: 0,
      iosEye: 'ios-eye',
      androidEye: 'md-eye',
    })
  }

  static navigationOptions = ( { navigation } ) => {
    const { title } = navigation.state.params

    return {
      title,
      headerTitleStyle: { fontSize: 25 },
    }
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { cardIndex, answer, numCorrect, iosEye, androidEye } = this.state
    const { questions, numQuestions, goBack } = this.props
    return (
      <View style={[styles.outerContainer]}>
        {cardIndex === numQuestions 
          ? <View style={styles.containerResults}>
            <Text style={styles.textAns}> You have correctly answered {numCorrect} out of {numQuestions}! </Text>
            <View>
              <View style={styles.correctBtnView}>
                <TouchableOpacity 
                  style={Platform.OS === 'ios' ? styles.incorrectBtn : styles.androidIncorrectBtn }
                  onPress={this.restartQuiz}
                >
                  <Text style={styles.submitBtnText}> Restart Quiz </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.incorrectBtnView}>
                <TouchableOpacity 
                  style={Platform.OS === 'ios' ? styles.incorrectBtn : styles.androidIncorrectBtn}
                  onPress={() => goBack()}
                >
                  <Text style={styles.submitBtnText}> Back to Deck </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          : <View style={[styles.container]}>
            <View style={styles.topView}>
              <Text style={styles.textQuestionCount}> { cardIndex + 1 }/{ numQuestions } </Text>
              <Text style={styles.removeTxt}>{ getIcon(FontAwesome, black, 'remove', 15)}</Text>
            </View>
              <View>
                <Text style={styles.text}> { questions[cardIndex].question } </Text> 
                <TouchableOpacity
                  onPress={this.flipCard}
                >
                  <Text style={styles.textFlipBtn}> 
                    { Platform.OS === 'ios' 
                      ? getIcon(Ionicons, black, iosEye) 
                      : getIcon(Ionicons, black, androidEye) 
                    }
                  </Text>
                  { answer && <Text style={styles.textAns}> { questions[cardIndex].answer } </Text> }
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.correctBtnView}>
                  <TouchableOpacity 
                    style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                    onPress={this.correct}
                  >
                    <Text style={styles.submitBtnText}> Correct </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.incorrectBtnView}>
                  <TouchableOpacity 
                    style={Platform.OS === 'ios' ? styles.incorrectBtn : styles.androidIncorrectBtn}
                    onPress={this.incorrect}
                  >
                    <Text style={styles.submitBtnText}> Incorrect </Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        }
      </View>
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
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  containerResults: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-around',
    flex: 1,
  },
  submitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    borderRadius: 7,
    height: 50,
  },
  androidSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    borderRadius: 2,
    height: 50,
  },
  incorrectBtn: {
    backgroundColor: lightRed,
    padding: 10,
    borderRadius: 7,
    height: 50,
  },
  androidIncorrectBtn: {
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '400',
    paddingBottom: 10,
    fontFamily: mainFont, 
  },
  textAns: {
    color: black,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '200',
    paddingBottom: 10,
    fontFamily: mainFont, 
  },
  textQuestionCount: {
    color: darkGray,
    fontSize: 15,
    fontWeight: '300',
    paddingTop: 10,
    fontFamily: mainFont, 
  },
  textFlipBtn: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: mainFont, 
  },
  incorrectBtnView: {
    paddingBottom: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  correctBtnView: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeTxt: {
    paddingTop: 10,
  }
})

function mapStateToProps(quizzes, { navigation }) {
  const { title } = navigation.state.params
  return {
    questions: quizzes[title].questions,
    numQuestions: quizzes[title].questions.length,
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps)(QuizCard)
