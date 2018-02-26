import { ADD_QUIZ, ADD_QUIZZES } from '../actions'

function quizzes (state ={}, action) {
  const { key, quizData, quizzes } = action
  switch(action.type) {
    case ADD_QUIZZES:
      return {
        ...state,
        ...quizzes
      }
    case ADD_QUIZ:
      return {
        ...state,
        [key]: quizData,
      }
    default:
      return state
  }
}

export default quizzes
