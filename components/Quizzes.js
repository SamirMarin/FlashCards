import React, { Component } from 'react' 
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'


class Quizzes extends Component {
  render() {
    return (
      <View style={styles.container}> 
        {this.props.quizzes && this.props.quizzes.length !== 0 && 
        <Text> This be a list of quizzes {this.props.quizzes[0].title} </Text>} 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps( quizzes ) {
    if ( quizzes ) {
      return {
        quizzes: Object.keys(quizzes).reduce((quizzes_arr, quiz) => {
          quizzes_arr = [...quizzes_arr, { title: quiz, size: quizzes[quiz].questions.length }]
          return quizzes_arr
        }, [])
      }
    }
}

export default connect(mapStateToProps)(Quizzes)
