import { AsyncStorage } from 'react-native'

export const QUIZZES_STORAGE_KEY = 'flashcards:quizzes'

export function setOrGetQuizDecks (results) {
  let quizzes = {}
  if (results === null) {
    AsyncStorage.setItem(QUIZZES_STORAGE_KEY, JSON.stringify({}))
  } else {
    quizzes = JSON.parse(results)
  }
  return quizzes
}
