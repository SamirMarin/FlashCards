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
import { lightGray, lightRed, black, darkGray } from '../utils/colors'
import { connect } from 'react-redux'

class QuizCard extends Component {
  state = {
    cardIndex: 0,
    answer: false,
    flipBtn: 'Answer',
    numCorrect: 0,
  }

  flipCard = () => {
    this.setState((state) => ({
      flipBtn: state.answer ? 'Answer' : 'Question',
      answer: !state.answer,
      }
    ))
  }

  correct = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      numCorrect: state.numCorrect + 1,
      answer: false,
      flipBtn: 'Answer',
    }))
  }

  incorrect = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      answer: false,
      flipBtn: 'Answer',
    }))
  }


  static navigationOptions = ( { navigation } ) => {
    const { title } = navigation.state.params

    return {
      title 
    }
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { cardIndex, answer, flipBtn, numCorrect } = this.state
    const { questions, numQuestions } = this.props
    return (
      <View style={[styles.outerContainer]}>
        {cardIndex === numQuestions 
          ? <View>
            <Text styel={{flex: 1}}> {numCorrect} out of {numQuestions} </Text>
          </View>
          : <View style={[styles.container]}>
              <Text style={styles.textQuestionCount}> { cardIndex + 1 }/{ numQuestions } </Text>
              <View>
                {answer
                    ? <Text style={styles.text}> { questions[cardIndex].answer } </Text>
                    : <Text style={styles.text}> { questions[cardIndex].question } </Text> 
                }
                <TouchableOpacity
                  onPress={this.flipCard}
                >
                  <Text style={styles.textFlipBtn}> { flipBtn } </Text>
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
                    style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
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
    paddingLeft: Platform.OS === 'ios' ? 0 : 10,
    paddingRight: Platform.OS === 'ios' ? 0 : 10,
    justifyContent: 'space-between',
    flex: 1,
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
    fontWeight: '900',
    paddingBottom: 10,
  },
  textQuestionCount: {
    color: darkGray,
    fontSize: 15,
    fontWeight: '300',
    paddingTop: 10,
  },
  textFlipBtn: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
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
})

function mapStateToProps(quizzes, { navigation }) {
  const { title } = navigation.state.params
  return {
    questions: quizzes[title].questions,
    numQuestions: quizzes[title].questions.length,
  }
}

export default connect(mapStateToProps)(QuizCard)
