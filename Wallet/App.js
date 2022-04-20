import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 500);
  }, []);

  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};
export default App;
