import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, NavigationProps, WeatherState } from "../types";

const Favorites = ({ navigation }: NavigationProps) => {

    return (
        <View style={styles.container}>
            <Text>Favoriets</Text>
        </View>
    );
};
export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
