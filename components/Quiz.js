import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import { lightRed, black } from '../utils/colors'
import { connect } from 'react-redux'
import { mainFont } from '../utils/helpers'

class Quiz extends Component {
  static navigationOptions = () => {
    return {
      title: "Quiz"
    }
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { size } = this.props
    return (
      <View style={styles.outerContainer} >
        <TouchableWithoutFeedback onPress={console.log("dissmiss")} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.titleText}>{ title }</Text>
            <Text style={styles.cardsText}>{ size } cards </Text>
            <View>
              <View style={styles.addCardBtnView}>
                <TouchableOpacity 
                  style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                  onPress={() => this.props.navigation.navigate('AddQuizCard', { title })}
                >
                  <Text style={styles.submitBtnText}>Add Card</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.startQuizBtnView}>
                <TouchableOpacity 
                  style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                  onPress={() => this.props.navigation.navigate('QuizCard', { title })}
                >
                  <Text style={styles.submitBtnText}> Start Quiz </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Platform.OS === 'ios' ? 20 : 20,
    paddingRight: Platform.OS === 'ios' ? 20 : 20,
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
  addCardBtnView: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  startQuizBtnView: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    color: black,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: mainFont, 
  },
  cardsText: {
    color: black,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: mainFont, 
  },
})

function mapStateToProps(quizzes, { navigation }) {
  const { title } = navigation.state.params
  return {
    size: quizzes[title].questions.length
  }
}

export default connect(mapStateToProps)(Quiz)
