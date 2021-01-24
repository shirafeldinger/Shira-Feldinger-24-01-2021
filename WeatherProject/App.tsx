import React from "react";
import Home from "./components/Home";
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "./components/Favorites";


const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        <RootStack.Screen name="Favoriets" component={Favorites} options={{ title: "Favoriets", headerTitleAlign: 'center' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

