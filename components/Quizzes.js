import React, { Component } from 'react' 
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { yellow, lightGray, darkGray, black } from '../utils/colors'
import { fetchAllQuizzes } from '../utils/api'
import { addQuizzes } from '../actions'
import { mainFont } from '../utils/helpers'


function Quiz({ title, size, props }) {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(
      'Quiz',
      { title },
    )}>
      <View style={styles.quiz}>
        <Text style={styles.quizTitle}> {title} </Text>
        <Text style={styles.quizSize}> {size} cards </Text>
      </View>
    </TouchableOpacity>
  )
}
class Quizzes extends Component {

  componentDidMount() {
    const { addQuizzes }  = this.props

    fetchAllQuizzes()
      .then((quizzes) => {

        return (addQuizzes(quizzes))
      })
  }

  renderItem = ({item}) => {
    const params = {
      ...item,
      props: this.props,
    }
    return <Quiz {...params}/>
  }
  
  render() {
    return (
      <View style={styles.container}> 
        {this.props.quizzes && this.props.quizzes.length === 0 
          ?  <Text style={styles.text}> You currently have no quizzes, but you can add some! </Text> 
          : <FlatList
            data={this.props.quizzes}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />}

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  quiz :{
    flex: 1,
    alignItems: 'center',
    backgroundColor: yellow,
    borderColor: darkGray,
    borderWidth: 1,
  },
  quizTitle: {
    flex: 1,
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: mainFont, 
  },
  quizSize: {
    color: darkGray,
    paddingBottom: 10,
    fontFamily: mainFont, 
  },
  text: {
    color: black,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '200',
    paddingTop: 50,
    fontFamily: mainFont, 
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
    } else {
      quizzes: []
    }
}

function mapDispatchToProps( dispatch ) {
  return {
    addQuizzes: (data) => dispatch(addQuizzes(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quizzes)
