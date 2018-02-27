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



class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }
  render() {
    const { title, size } = this.props.navigation.state.params
    return (
      <View style={styles.outerContainer} >
        <TouchableWithoutFeedback onPress={console.log("dissmiss")} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.titleText}>{ title }</Text>
            <Text style={styles.cardsText}>{ size } cards </Text>
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={console.log("add card")}
            >
              <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
              onPress={console.log("start quiz")}
            >
              <Text style={styles.submitBtnText}> Start Quiz </Text>
            </TouchableOpacity>
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
  titleText: {
    color: black,
    fontSize: 50,
    textAlign: 'center',
  },
  cardsText: {
    color: black,
    fontSize: 30,
    textAlign: 'center',
  },
})

export default Quiz
