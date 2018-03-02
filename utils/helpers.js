import React from 'react';
import { Platform, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const mainFont = Platform.OS === 'ios' ? 'System' : 'System'
export const appNameFont = Platform.OS === 'ios' ? 'Zapfino' : 'sans-serif-thin'

export function getIcon(Component, tintColor, name) {
  return  (
      <Component 
        name={name}
        size={30} 
        color={tintColor}/>
  )
}

const NOTIFICATION_KEY = 'flashcards:notifications'

const localNotification = {
  title: 'Take a quiz',
  body: "don't forget to take your daily quiz!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
  }
}

export function removeLocalNotification() {
  return (AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync()))
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {

        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tmr = new Date()
              tmr.setDate(tmr.getDate() + 1)
              tmr.setHours(18)
              tmr.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                localNotification, 
                {time: tmr, repeat: 'day'},
              )
            }

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          })
      }
    })
}

