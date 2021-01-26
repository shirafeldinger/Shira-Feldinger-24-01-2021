import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Favorite, WeatherState } from "../types";
import { Text, Card, Icon, Button } from 'react-native-elements';

const Favorites = () => {
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text h1 >Favoriets</Text>
            </View>
            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                    {favorites.map(favorite => {
                        return (
                            <Card key={favorite.name} containerStyle={styles.cardStyle}>
                                <Text style={styles.textStyle}>{favorite.name}</Text>
                                <Text style={styles.textStyle}>{`${favorite.temperatureValue}°${favorite.temperatureUnit}`}</Text>
                                <Text style={styles.textStyle}>{favorite.currentWeather}</Text>
                            </Card>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardStyle: {
        height: 150,
        width: 100,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 17
    },
});
