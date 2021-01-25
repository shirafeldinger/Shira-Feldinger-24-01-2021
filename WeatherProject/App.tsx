import React from "react";
import Home from "./components/Home";
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "./components/Favorites";
import { Button, View } from "react-native";


const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
        title: 'Home', headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => navigation.navigate('Favoriets')}
              title="Favoriets" />
            <Button
              onPress={() => navigation.navigate('Home')}
              title="Home"
            />
          </View>
        )
      })}>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Favoriets" component={Favorites} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

