import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, Favorite, NavigationProps, WeatherState } from "../types";
import { Text, Card } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { iconsImages } from "../resources/iconsSwitch";

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
            width: 130,
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
        imageStyle: {
            width: 50,
            height: 50,
            alignSelf: 'center'
        },
    });

    const showFavoriteDetails = (name: string) => {
        navigation.navigate('Home')
        dispatch({ type: ActionTypes.setSearchedCity, searchedCity: name });
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
                            <TouchableOpacity key={favorite.id} onPress={() => showFavoriteDetails(favorite.name)}>
                                <Card containerStyle={styles.cardStyle}>
                                    <Text style={styles.textStyle}>{favorite.name}</Text>
                                    <Image style={styles.imageStyle} source={iconsImages(favorite.icon)} />
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
