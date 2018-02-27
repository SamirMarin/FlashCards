export const ADD_QUIZ = 'ADD_QUIZ'
export const ADD_QUIZZES = 'ADD_QUIZZES'

export function addQuizzes ( { quizzes } ) {
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
