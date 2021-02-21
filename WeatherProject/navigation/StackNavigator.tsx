import React, { Fragment, useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { ButtonGroup } from "react-native-elements";
import { Dimensions, View } from "react-native";
import Home from "../components/Home";
import Favorites from "../components/Favorites";
import { RootStackParamList, themeProps } from "../types";

const dimensions = Dimensions.get('window');
const RootStack = createStackNavigator<RootStackParamList>();


const MainStackNavigator = (props: themeProps) => {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const pagesButtons = ['Favorites', 'Home'];
  const themeButtons = ['Dark', 'Light'];
  return (
    <RootStack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
      headerLeft: undefined, headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <ButtonGroup
            onPress={(themeIndex) => { props.setThemeIndex(themeIndex) }}
            selectedIndex={props.themeIndex} buttons={themeButtons} containerStyle={{ width: dimensions.width < 350 ? 80 : 100 }} />
          <ButtonGroup
            onPress={(selectedIndex) => {
              setSelectedIndex(selectedIndex);
              navigation.navigate(pagesButtons[selectedIndex])
            }}
            selectedIndex={selectedIndex} buttons={pagesButtons} containerStyle={{ width: dimensions.width < 350 ? 130 : 150 }} />
        </View>
      )
    })}>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Favorites" component={Favorites} />

    </RootStack.Navigator>
  );
};


const ContactStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Favorites" component={Favorites} />
    </RootStack.Navigator>
  );
};
export { MainStackNavigator, ContactStackNavigator };