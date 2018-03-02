import React from 'react';
import { Platform } from 'react-native'

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
