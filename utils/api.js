import { AsyncStorage } from 'react-native'
import { QUIZZES_STORAGE_KEY, setOrGetQuizDecks } from './_quizzesData'

export function fetchAllQuizzes() {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY)
    .then(setOrGetQuizDecks)
}

export function addNewQuiz({ key, quizData }) {
  return AsyncStorage.mergeItem(QUIZZES_STORAGE_KEY, JSON.stringify({
    [key]: quizData
  })) 
}

export function addQuestionToQuiz({ key, question }) {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY)
    .then((quizzes) => JSON.parse(quizzes)[key])
    .then((quizData) => AsyncStorage.mergeItem(QUIZZES_STORAGE_KEY, JSON.stringify({
      [key]: {...quizData, 'questions': [...quizData.questions, question]}
    })))
}

export function deleteQuizStorage( key ) {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      data[key] = undefined
      delete data[key]
      return AsyncStorage.setItem(QUIZZES_STORAGE_KEY, JSON.stringify(data))
    })
}

export function deleteQuestionFromQuiz({ key, questions }) {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY)
    .then((quizzes) => JSON.parse(quizzes)[key])
    .then((quizData) => AsyncStorage.mergeItem(QUIZZES_STORAGE_KEY, JSON.stringify({
      [key]: {...quizData, 'questions': questions }
    })))
}
