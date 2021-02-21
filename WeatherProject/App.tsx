import React, { Fragment, useState } from "react";
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MainStackNavigator } from "./navigation/StackNavigator";
import BottomTabNavigator from "./navigation/TabNavigator";


const App = () => {
  const [themeIndex, setThemeIndex] = useState(2)
  const themeButtons = ['Dark', 'Light'];

  return (
    <AppearanceProvider>
      <NavigationContainer theme={themeButtons[themeIndex] === 'Dark' ? DarkTheme : DefaultTheme}>
        <BottomTabNavigator setThemeIndex={setThemeIndex} themeIndex={themeIndex} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;

