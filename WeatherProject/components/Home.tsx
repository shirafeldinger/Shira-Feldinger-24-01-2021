import React, { Fragment, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Card, Icon, Button } from 'react-native-elements';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDaysForecast, WeatherState, Location, Favorite } from "../types";
import { demiCurrent, demiFive, demiLocal } from "../demiData";
import Toast from 'react-native-toast-message';
import { useTheme } from '@react-navigation/native';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import { iconsImages } from '../resources/iconsSwitch';

const Home = () => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as FiveDaysForecast;
    const location = useSelector<WeatherState>(state => state.location) as Location;
    const searchedCity = useSelector<WeatherState>(state => state.searchedCity) as string;
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const [input, setInput] = useState('')
    const [currentToggleTempValue, setCurrentToggleTempValue] = useState(0)
    const [toggleTempUnit, setToggleTempUnit] = useState('F')
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState('');


    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        inputStyle: {
            borderColor: 'gray',
            borderWidth: 1,
            width: '50%',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 17,
        },

        labelStyle: {
            textTransform: 'capitalize',
            textAlign: 'center',
            color: colors.text
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
        fiveDaysForecastView: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },

    });

    // useEffect(() => {
    //     setLoading(true);
    //     fetchLocation().then((key: string) => {
    //         Promise.all([fetchCurrentWeather(key), fiveDaysForecasts(key)]).then(() => {
    //             setLoading(false);
    //             setCurrentToggleTempValue(currentDay.Temperature.Imperical.Value)
    //         });
    //     }).catch(error => {
    //         setErrors(error);
    //         Toast.show({
    //             text1: error,
    //             type: 'error',
    //             visibilityTime: 3000,
    //             autoHide: true,
    //             position: 'bottom'
    //         });
    //     });
    // }, [searchedCity]);

    useEffect(() => {
        setCurrentToggleTempValue(demiCurrent.Temperature.Imperical.Value)
    }, [])

    const fetchLocation = async (): Promise<string> => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        try {
            const res = await fetch(`${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${searchedCity}`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.setLocation, location: data[0] });
                return Promise.resolve(data[0]?.Key as string);
            } else {
                return Promise.reject("could find location");
            }
        } catch (err) {
            setErrors(error);
            return Promise.reject(err);
        };
    };

    const fetchCurrentWeather = async (key: string) => {
        const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1'
        try {
            const res = await fetch(`${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()
            if (data[0]) {
                dispatch({ type: ActionTypes.SetCurrentWeather, currentDay: data[0] });
            } else {
                return Promise.reject("could find current weather");
            }
        } catch (err) {
            setErrors(error);
            return Promise.reject(err);
        };
        return Promise.resolve();
    };

    const fiveDaysForecasts = async (key: string) => {
        const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day'
        try {
            const res = await fetch(`${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json();

            if (data) {
                dispatch({ type: ActionTypes.setFiveDaysForecast, fiveDaysForecast: data });
            } else {
                return Promise.reject("could find weekly weather");
            }
        } catch (err) {
            setErrors(error);
            return Promise.reject(err);
        };
        return Promise.resolve();
    };

    const searchedValidation = () => {
        setInput('');
        if (input.length === 0) {
            Toast.show({
                text1: 'Please enter a city name',
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom'
            });
            return;
        };
        dispatch({ type: ActionTypes.setSearchedCity, searchedCity: input });
    };
    const handleFavorites = () => {
        let newFavorites: Array<Favorite> = [...favorites];
        if (newFavorites.length > 0) {
            newFavorites.forEach((favorite: Favorite) => {
                console.log(favorite.name);
                if (favorite.name = demiLocal.LocalizedName) {
                    const removeFavorites = newFavorites.filter(favorite => favorite.name !== demiLocal.LocalizedName)
                    dispatch({ type: ActionTypes.setFavorites, favorites: removeFavorites })
                } else {
                    newFavorites.push({
                        temperatureValue: demiCurrent.Temperature.Metric.Value, temperatureUnit: demiCurrent.Temperature.Metric.Unit,
                        currentWeather: demiCurrent.WeatherText, id: demiLocal.Key, name: demiLocal.LocalizedName
                    });
                    dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
                }
            });
        } else {
            newFavorites.push({
                temperatureValue: demiCurrent.Temperature.Metric.Value, temperatureUnit: demiCurrent.Temperature.Metric.Unit,
                currentWeather: demiCurrent.WeatherText, id: demiLocal.Key, name: demiLocal.LocalizedName
            });
            dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
        };
    };

    const toggleTempUnits = (unit: string, tempValue: number) => {
        let newValue = tempValue;
        let newUnit = toggleTempUnit;
        if (unit == 'C') {
            newValue = Math.round((newValue * (9 / 5)) + 32)
            newUnit = 'F'
        } else {
            newValue = Math.round((newValue - 32) * (5 / 9))
            newUnit = 'C'
        }
        setCurrentToggleTempValue(newValue)
        setToggleTempUnit(newUnit)

    };
    return (

        < View style={styles.container} >
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                <TextInput style={styles.inputStyle}
                    onChangeText={text => { text.replace(/[^A-Za-z]/ig, ''); setInput(text) }}
                    placeholder="Search City..."
                    placeholderTextColor={colors.text}
                    value={input} />
                <Button buttonStyle={{ height: 52 }} title='search' onPress={searchedValidation} />
            </View>

            <View style={{ flex: 1.7, justifyContent: 'space-around' }} >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button title={`°${toggleTempUnit}`} onPress={() => toggleTempUnits(toggleTempUnit, currentToggleTempValue)} />

                    <Text h3 style={styles.labelStyle}>Current Weather:</Text>
                    {favorites.some(favorite => favorite.name == demiLocal.LocalizedName) ?
                        <EvilIcon style={{ marginHorizontal: 5 }} name='heart' color='#f50' size={25}></EvilIcon> : null
                    }
                    <Text style={styles.textStyle}>{demiLocal.LocalizedName}</Text>
                    <Text style={styles.textStyle}>{demiCurrent.WeatherText}</Text>
                    <Text style={styles.textStyle}>{`${currentToggleTempValue}°${toggleTempUnit}`}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button title={favorites.some(favorite => favorite.name == demiLocal.LocalizedName) ? 'remove from favorites' : 'add to favorites'} onPress={handleFavorites} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text h3 style={styles.labelStyle} > next 5 day forecast:</Text>
                    <Text style={[styles.textStyle, { width: '90%' }]}>{demiFive?.Headline?.Text}</Text>
                </View>

            </View>

            <ScrollView style={{ flex: 1 }} horizontal={true}>
                <View style={styles.fiveDaysForecastView}>
                    {demiFive?.DailyForecasts?.map(dailyForecast => {
                        // console.log(dailyForecast.Day.Icon.toString());
                        const date = new Date(dailyForecast.Date).toString();
                        const spaceIndex = date.indexOf(' ');
                        return (
                            <Card key={dailyForecast.Date} containerStyle={{ borderColor: colors.border, backgroundColor: colors.background }}>
                                <Fragment>
                                    <Text h4 style={styles.textStyle}>{date.substr(0, spaceIndex)}</Text>
                                    <Image style={styles.imageStyle} source={iconsImages(dailyForecast.Day.Icon)} />
                                    <Text style={styles.textStyle} >{`Max: ${dailyForecast?.Temperature?.Maximum.Value}°${dailyForecast?.Temperature?.Maximum.Unit}`}</Text>
                                    <Text style={styles.textStyle} >{`Min: ${dailyForecast?.Temperature?.Minimum.Value}°${dailyForecast?.Temperature?.Minimum.Unit}`}</Text>
                                </Fragment>
                            </Card>
                        )
                    })}
                </View>
            </ScrollView>
        </View >
    )

};

export default Home;
