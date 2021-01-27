import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, Favorite, NavigationProps, WeatherState } from "../types";
import { Text, Card, Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

const Favorites = ({ navigation }: NavigationProps) => {
    const { colors } = useTheme();
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>
    const dispatch = useDispatch();

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

    const showFavoriteDetails = (key: string) => {
        navigation.navigate('Home')
        dispatch({ type: ActionTypes.setSearchedCity, searchedCity: key });
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text h1 style={{ color: colors.text }} >Favoriets</Text>
            </View>
            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                    {favorites.map(favorite => {
                        return (
                            <TouchableOpacity key={favorite.id} onPress={() => showFavoriteDetails(favorite.id)}>
                                <Card containerStyle={styles.cardStyle}>
                                    <Text style={styles.textStyle}>{favorite.name}</Text>
                                    <Text style={styles.textStyle}>{`${favorite.temperatureValue}°${favorite.temperatureUnit}`}</Text>
                                    <Text style={styles.textStyle}>{favorite.currentWeather}</Text>
                                </Card>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Favorites;
