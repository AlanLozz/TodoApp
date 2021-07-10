import React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/HomeStack';
import { colors } from './src/common/Colors';

const App = () => {
  
  return(
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.dark} />
        <Navigation />
      </NavigationContainer>
    </>
  )
};

export default App;