import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import { themeProps } from "../types";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = (props: themeProps) => {
    return (
        <Tab.Navigator tabBarOptions={{ tabStyle: { alignItems: 'center', justifyContent: 'center' } }}>
            <Tab.Screen name="Home" children={() => <MainStackNavigator setThemeIndex={props.setThemeIndex} themeIndex={props.themeIndex} />} />
            <Tab.Screen name="Favorites" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};
export default BottomTabNavigator;