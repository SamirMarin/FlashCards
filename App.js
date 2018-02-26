import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import CreateQuiz from './components/CreateQuiz'
import Quizzes from './components/Quizzes'
import { TabNavigator } from 'react-navigation'
import { lightGray, lightRed, black } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const Tabs = TabNavigator({
  Quizzes: {
    screen: Quizzes,
    navigationOptions: {
      tabBarLabel: 'Quizzes'
    }
  },
  CreateQuiz: {
    screen: CreateQuiz,
    navigationOptions: {
      tabBarLabel: 'Create Quiz'
    }
  },
},
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? lightRed : lightGray,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : lightRed,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }
  }
)

const store = createStore(reducer)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Tabs/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
