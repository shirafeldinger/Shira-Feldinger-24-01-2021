import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Favorite, WeatherState } from "../types";
import { Text, Card, Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Favorites = () => {
    const { colors } = useTheme();
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>

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
            justifyContent: 'space-around',
            backgroundColor: colors.background,
            borderColor: colors.border,
        },
        textStyle: {
            textAlign: 'center',
            fontSize: 17,
            color: colors.text
        },
    });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text h1 style={{ color: colors.text }} >Favoriets</Text>
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
