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

const Home = () => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as FiveDaysForecast;
    const location = useSelector<WeatherState>(state => state.location) as Location;
    const searchedCity = useSelector<WeatherState>(state => state.searchedCity) as string;
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>
    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    const { colors } = useTheme();
    const [toggleTempValue, setToggleTempValue] = useState(0)
    const [toggleTempUnit, setToggleTempUnit] = useState('F')
    const [loading, setLoading] = useState(true);


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
            fontSize: 17
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

    useEffect(() => {
        setLoading(true);
        fetchLocation().then((key: string) => {
            Promise.all([fetchCurrentWeather(key), fiveDaysForecasts(key)]).then(() => {
                setLoading(false)
            });
        }).catch(error => {
            console.log(error);
        });
    }, [searchedCity, favorites]);

    const fetchLocation = async (): Promise<string> => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        try {
            const res = await fetch(`${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${searchedCity}`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.setLocation, location: data[0] });
                return Promise.resolve(data[0]?.Key as string);
            }
            return Promise.reject("no key");
        } catch (err) {
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
            }
        } catch (err) {
            console.error('current weather error!', err)
            return Promise.reject(err);
        };
        return Promise.resolve();
    };

    const fiveDaysForecasts = async (key: string) => {
        const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day'
        try {
            const res = await fetch(`${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()
            console.log(data);

            if (data) {
                dispatch({ type: ActionTypes.setFiveDaysForecast, fiveDaysForecast: data });
            }
        } catch (err) {
            console.error('five days error', err)
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

    console.log(favorites, 'out');

    const handleFavorites = () => {
        console.log(favorites, 'start');
        let newFavorites: Array<Favorite> = [...favorites];
        if (newFavorites.length > 0) {
            newFavorites.forEach((favorite: Favorite) => {
                if (favorite.name == location.LocalizedName) {
                    const removeFavorites = newFavorites.filter(favorite => favorite.name !== location.LocalizedName)
                    dispatch({ type: ActionTypes.setFavorites, favorites: removeFavorites })
                } else {
                    newFavorites.push({
                        temperatureValue: currentDay.Temperature.Metric.Value, temperatureUnit: currentDay.Temperature.Metric.Unit,
                        currentWeather: currentDay.WeatherText, id: location.Key, name: location.LocalizedName
                    });
                    dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
                }
            });
        } else {
            newFavorites.push({
                temperatureValue: currentDay.Temperature.Metric.Value, temperatureUnit: currentDay.Temperature.Metric.Unit,
                currentWeather: currentDay.WeatherText, id: location.Key, name: location.LocalizedName
            });
            dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
        };
        console.log(favorites, 'end');
    };

    const toggleTempUnits = (unit: string) => {
        let newValue = toggleTempValue;
        let newUnit = toggleTempUnit;
        if (unit == 'F') {
            newValue = Math.round((newValue * (9 / 5)) + 32)
            newUnit = 'C'

        } else {
            newValue = Math.round((newValue - 32) * (5 / 9))
            newUnit = 'F'
        }
        setToggleTempValue(newValue)
        setToggleTempUnit(newUnit)
    };
    return (
        (loading ? <Text>loading</Text> :
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
                        <Button title={`°${toggleTempUnit}`} onPress={() => toggleTempUnits(toggleTempUnit)} />

                        <Text h3 style={styles.labelStyle}>Current Weather:</Text>
                        {favorites.some(favorite => favorite.name == location.LocalizedName) ?
                            <EvilIcon style={{ marginHorizontal: 5 }} name='heart' color='#f50' size={25}></EvilIcon> : null
                        }
                        <Text style={styles.textStyle}>{location.LocalizedName}</Text>
                        <Text style={styles.textStyle}>{currentDay.WeatherText}</Text>
                        <Text style={styles.textStyle}>{`${toggleTempValue}°${toggleTempUnit}`}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Button title={favorites.some(favorite => favorite.name == location.LocalizedName) ? 'remove from favorites' : 'add to favorites'} onPress={handleFavorites} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text h3 style={styles.labelStyle} > next 5 day forecast:</Text>
                        <Text style={[styles.textStyle, { width: '90%' }]}>{fiveDaysForecast?.Headline?.Text}</Text>
                    </View>

                </View>

                <ScrollView style={{ flex: 1 }} horizontal={true}>
                    <View style={styles.fiveDaysForecastView}>
                        {fiveDaysForecast?.DailyForecasts?.map(dailyForecast => {
                            // console.log(dailyForecast.Day.Icon.toString());
                            const date = new Date(dailyForecast.Date).toString();
                            const spaceIndex = date.indexOf(' ')
                            return (
                                <Card key={dailyForecast.Date} containerStyle={{ borderColor: colors.border, backgroundColor: colors.background }}>
                                    <Fragment>
                                        <Text h4 style={styles.textStyle}>{date.substr(0, spaceIndex)}</Text>
                                        <Image style={styles.imageStyle} source={require(`../resources/weather-icons/1.png`)} />
                                        <Text style={styles.textStyle} >{`Max: ${dailyForecast?.Temperature?.Maximum.Value}°${toggleTempUnit}`}</Text>
                                        <Text style={styles.textStyle} >{`Min: ${dailyForecast?.Temperature?.Minimum.Value}°${toggleTempUnit}`}</Text>
                                    </Fragment>
                                </Card>
                            )
                        })}
                    </View>
                </ScrollView>
            </View >
        )
    )

};

export default Home;
