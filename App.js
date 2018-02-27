import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import CreateQuiz from './components/CreateQuiz'
import Quizzes from './components/Quizzes'
import Quiz from './components/Quiz'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { lightGray, lightRed, black, yellow } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'

function FlashCardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

function getIcon(Component, tintColor, name) {
  return  (
      <Component 
        name={name}
        size={30} 
        color={tintColor}/>
  )
}

const Tabs = TabNavigator({
  Quizzes: {
    screen: Quizzes,
    navigationOptions: {
      tabBarLabel: 'Quizzes',
      tabBarIcon: ({ tintColor }) => ( Platform.OS === 'ios' 
        ? getIcon(Ionicons, tintColor, 'ios-list' ) 
        : getIcon(Ionicons, tintColor, 'md-list' ) )
    }
  },
  CreateQuiz: {
    screen: CreateQuiz,
    navigationOptions: {
      tabBarLabel: 'Create Quiz',
      tabBarIcon: ({ tintColor }) => ( Platform.OS === 'ios' 
        ? getIcon(Ionicons, tintColor, 'ios-add-circle' ) 
        : getIcon(Ionicons, tintColor, 'md-add-circle' ) )
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
        backgroundColor: Platform.OS === 'ios' ? lightGray : lightRed,
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: yellow,
      }
    }
  },
})

const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashCardsStatusBar backgroundColor={lightRed} barStyle='light-content'/>
          <MainNavigator/>
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
