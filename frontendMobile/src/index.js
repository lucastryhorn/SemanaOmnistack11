import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react'
import 'react-native-gesture-handler'
import Routes from './routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Routes />
    </SafeAreaProvider>
  )
}

export default App
