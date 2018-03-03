export const ADD_QUIZ = 'ADD_QUIZ'
export const ADD_QUIZZES = 'ADD_QUIZZES'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUIZ = 'DELETE_QUIZ'
export const DELETE_QUESTION = 'DELETE_QUESTION'

export function addQuizzes ( quizzes ) {
  return {
    type: ADD_QUIZZES,
    quizzes,
  }
}

export function addQuiz ( { key, quizData } ) {
  return {
    type: ADD_QUIZ,
    key,
    quizData,
  }
}

export function addQuestion ( { key, question } ) {
  return {
    type: ADD_QUESTION,
    key,
    question,
  }
}

export function deleteQuiz ( key ) {
  return {
    type: DELETE_QUIZ,
    key,
  }
}

export function deleteQuestion ( { key, questions } ) {
  return {
    type: DELETE_QUESTION,
    key,
    questions,
  }
}
