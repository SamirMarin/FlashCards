import { ADD_QUIZ, ADD_QUIZZES, ADD_QUESTION } from '../actions'

function quizzes (state ={}, action) {
  const { key, quizData, quizzes, question } = action
  switch(action.type) {
    case ADD_QUIZZES:
      return {
        ...state,
        ...quizzes,
      }
    case ADD_QUIZ:
      return {
        ...state,
        [key]: quizData,
      }
    case ADD_QUESTION:
      return {
        ...state,
        [key]: {
          ...state[key],
          'questions': [...state[key].questions, question]
        }
      }
    default:
      return state
  }
}

export default quizzes
