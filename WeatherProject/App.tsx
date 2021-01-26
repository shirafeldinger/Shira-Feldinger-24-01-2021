import React, { useState } from "react";
import Home from "./components/Home";
import { RootStackParamList } from './types';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "./components/Favorites";
import { ButtonGroup } from "react-native-elements";
import Toast from 'react-native-toast-message';


const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const buttons = ['Favorites', 'Home'];
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
          title: 'Home', headerRight: () => (
            <ButtonGroup
              onPress={(selectedIndex) => {
                setSelectedIndex(selectedIndex);
                navigation.navigate(buttons[selectedIndex])
              }}
              selectedIndex={selectedIndex} buttons={buttons} containerStyle={{ width: 200 }} />
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

