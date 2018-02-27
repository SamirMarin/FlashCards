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
