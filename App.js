import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import CreateQuiz from './components/CreateQuiz'
import Quizzes from './components/Quizzes'
import Quiz from './components/Quiz'
import AddQuizCard from './components/AddQuizCard'
import QuizCard from './components/QuizCard'
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import { lightGray, lightRed, black, yellow, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { getIcon, appNameFont, setLocalNotification, removeLocalNotification } from './utils/helpers'

function FlashCardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
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
    },
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
      title: "Cartaz",
      headerStyle: { backgroundColor: lightRed },
      headerTitleStyle: { color: white, fontFamily: appNameFont, fontSize: 25 },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: black,
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
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightRed,
      }
    }
  },
  AddQuizCard: {
    screen: AddQuizCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightRed,
      },
    }
  },
  QuizCard: {
    screen: QuizCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightRed,
      }
    }
  },
})

const store = createStore(reducer)

export default class App extends React.Component {
   //TODO start setting local notifications reminder once past intial release stage
  //componentDidMount () {
  // setLocalNotification()
  //}
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
