import React, { useState } from "react";
import Home from "./components/Home";
import { RootStackParamList } from './types';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "./components/Favorites";
import { ButtonGroup } from "react-native-elements";
import Toast from 'react-native-toast-message';
import { View } from "react-native";


const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [themeIndex, setThemeIndex] = useState(2)
  const pagesButtons = ['Favorites', 'Home'];
  const themeButtons = ['Dark', 'Light'];
  return (
    <AppearanceProvider>
      <NavigationContainer theme={themeButtons[themeIndex] === 'Dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
          headerLeft: null, headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <ButtonGroup
                onPress={(themeIndex) => {
                  setThemeIndex(themeIndex);
                }}
                selectedIndex={themeIndex} buttons={themeButtons} containerStyle={{ width: 100 }} />
              <ButtonGroup
                onPress={(selectedIndex) => {
                  setSelectedIndex(selectedIndex);
                  navigation.navigate(pagesButtons[selectedIndex])
                }}
                selectedIndex={selectedIndex} buttons={pagesButtons} containerStyle={{ width: 150 }} />
            </View>
          )
        })}>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Favorites" component={Favorites} />

        </RootStack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;

