import React, { useState } from "react";
import Home from "./components/Home";
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "./components/Favorites";
import { ButtonGroup } from "react-native-elements";
import Toast from 'react-native-toast-message';


const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const buttons = ['Favoriets', 'Home']
  return (
    <NavigationContainer>
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
        <RootStack.Screen name="Favoriets" component={Favorites} />

      </RootStack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;

