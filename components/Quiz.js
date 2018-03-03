import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Platform,
  Alert,
} from 'react-native'
import { lightRed, black, white } from '../utils/colors'
import { connect } from 'react-redux'
import { mainFont, getIcon } from '../utils/helpers'
import { FontAwesome } from '@expo/vector-icons'
import { deleteQuiz } from '../actions'
import { deleteQuizStorage } from '../utils/api'

class Quiz extends Component {
  confirmDeletion(key) {
    const { deleteQuiz, goBack } = this.props
    Alert.alert(
      'Confirm Deletion of Quiz',
      `Are you sure you want to delete ${key} quiz?`,
      [
        { 
          text: "Cancel", 
          onPress: console.log("cancel")
        },
        { 
          text: "Delete", 
          onPress: () => { 
            deleteQuizStorage(key)
              .then(() => {
                goBack()
                deleteQuiz(key)
              })
          }}, 
      ],
      {cancelable: false},
    )
  }

  static navigationOptions = {
    title: 'Quiz', 
    headerTitleStyle: { fontSize: 25 },
    headerTintColor: white,
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { size } = this.props
    return (
      <View style={styles.outerContainer} >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.confirmDeletion(title)}
            >
              <Text style={styles.removeTxt}>{ getIcon(FontAwesome, black, 'remove', 15)}</Text>
            </TouchableOpacity>
            <Text style={styles.titleText}>{ title }</Text>
            <Text style={styles.cardsText}>{ size } cards </Text>
            <View>
              { size > 0 && 
                  <View style={styles.startQuizBtnView}>
                    <TouchableOpacity 
                      style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                      onPress={() => this.props.navigation.navigate('QuizCard', { title })}
                    >
                      <Text style={styles.submitBtnText}> Start Quiz </Text>
                    </TouchableOpacity>
                  </View>
              }
              <View style={styles.addCardBtnView}>
                <TouchableOpacity 
                  style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                  onPress={() => this.props.navigation.navigate('AddQuizCard', { title })}
                >
                  <Text style={styles.submitBtnText}>Add Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingBottom: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  startQuizBtnView: {
    paddingBottom: 10,
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
  removeTxt: {
    textAlign: 'right',
    paddingTop: 10,
  },
  headerText: {
    textAlign: 'center',
  },
})

function mapStateToProps(quizzes, { navigation }) {
  const { title } = navigation.state.params
  return {
    size: quizzes[title] ? quizzes[title].questions.length : null,
    goBack: () => navigation.goBack(),
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    deleteQuiz: (data) => dispatch(deleteQuiz(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
