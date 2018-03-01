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
import { lightGray, lightRed, black } from '../utils/colors'
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
    }))
  }

  incorrect = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      answer: false,
      flipBtn: 'Answer'
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
      <View style={[styles.outerContainer, styles.container]}>
        {cardIndex === numQuestions 
          ? <View>
            <Text> {numCorrect} out of {numQuestions} </Text>
          </View>
          : <View style={styles.container}>
            <Text style={styles.text}> { cardIndex + 1 }/{ numQuestions } </Text>
            {answer
                ? <Text style={styles.text}> { questions[cardIndex].answer } </Text>
                : <Text style={styles.text}> { questions[cardIndex].question } </Text> 
            }
            <TouchableOpacity
              onPress={this.flipCard}
            >
              <Text style={styles.text}> { flipBtn } </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={this.correct}
            >
              <Text style={styles.submitBtnText}> Correct </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={this.incorrect}
            >
              <Text style={styles.submitBtnText}> Incorrect </Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Platform.OS === 'ios' ? 0 : 10,
    paddingRight: Platform.OS === 'ios' ? 0 : 10,
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

function mapStateToProps(quizzes, { navigation }) {
  const { title } = navigation.state.params
  return {
    questions: quizzes[title].questions,
    numQuestions: quizzes[title].questions.length,
  }
}

export default connect(mapStateToProps)(QuizCard)
