import React, { Fragment, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Card, Icon, Button } from 'react-native-elements';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDaysForecast, WeatherState, Location, Favorite } from "../types";
import { demiCurrent, demiFive, demiLocal } from "../demiData";
import Toast from 'react-native-toast-message';

const Home = () => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as FiveDaysForecast;
    const location = useSelector<WeatherState>(state => state.location) as Location;
    const searchedCity = useSelector<WeatherState>(state => state.searchedCity) as string;
    const favorites = useSelector<WeatherState>(state => state.favorites) as Array<Favorite>
    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    const [toggleFavorites, setToggleFavorites] = useState(false)

    useEffect(() => {
        // allFetches()
    }, []);

    const allFetches = async () => {
        await fetchLocation()
        await fetchCurrentWeather()
        await fiveDaysForecasts()
    }
    const fetchLocation = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        try {
            const res = await fetch(`${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${searchedCity}`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.setLocation, location: data[0] });
            }
        } catch (err) {
            console.log(err);
        };
    };

    const fetchCurrentWeather = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1'
        try {
            const res = await fetch(`${baseUrl}/${location.Key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.SetCurrentWeather, currentDay: data[0] });
            }
        } catch (err) {
            console.error('current weather error!', err)
        };
    };

    const fiveDaysForecasts = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day'
        try {
            const res = await fetch(`${baseUrl}/${location.Key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()

            if (data) {
                dispatch({ type: ActionTypes.setFiveDaysForecast, fiveDaysForecast: data });
            }
        } catch (err) {
            console.error('five days error', err)
        };
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
                if (favorite.name == demiLocal.LocalizedName) {
                    const removeFavorites = newFavorites.filter(favorite => favorite.name !== demiLocal.LocalizedName)
                    setToggleFavorites(false)
                    dispatch({ type: ActionTypes.setFavorites, favorites: removeFavorites })
                } else {
                    newFavorites.push({
                        temperatureValue: demiCurrent.Temperature.Metric.Value, temperatureUnit: demiCurrent.Temperature.Metric.Unit,
                        currentWeather: demiCurrent.WeatherText, id: demiLocal.Key, name: demiLocal.LocalizedName
                    });
                    setToggleFavorites(true)
                    dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
                }
            });
        } else {
            newFavorites.push({
                temperatureValue: demiCurrent.Temperature.Metric.Value, temperatureUnit: demiCurrent.Temperature.Metric.Unit,
                currentWeather: demiCurrent.WeatherText, id: demiLocal.Key, name: demiLocal.LocalizedName
            });
            setToggleFavorites(true)
            dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites })
        }

    };

    console.log(favorites);




    return (
        <View style={styles.container}>

            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                <TextInput style={styles.inputStyle}
                    onChangeText={text => { text.replace(/[^A-Za-z]/ig, ''); setInput(text) }}
                    placeholder="Search City..."
                    value={input} />
                <Button title='search' onPress={searchedValidation} />
            </View>

            <View style={{ flex: 1.5, justifyContent: 'space-around' }} >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {toggleFavorites ?
                        <Icon name='heart' type='evilicon' color='#f50'></Icon> : null
                    }
                    <Text h3 style={styles.labelStyle}>Current Weather:</Text>
                    <Text style={styles.textStyle}>{demiLocal.LocalizedName}</Text>
                    <Text style={styles.textStyle}>{demiCurrent.WeatherText}</Text>
                    <Text style={styles.textStyle}>{`${demiCurrent.Temperature.Metric.Value}°${demiCurrent.Temperature.Metric.Unit}`}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button title={toggleFavorites ? 'remove from favoriets' : 'add to favoriets'} onPress={handleFavorites} />
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
                        const spaceIndex = date.indexOf(' ')
                        return (
                            <Card key={dailyForecast.Date}>
                                <Fragment>
                                    <Text h4 style={styles.textStyle}>{date.substr(0, spaceIndex)}</Text>
                                    <Image style={styles.imageStyle} source={require(`../resources/weather-icons/1.png`)} />
                                    <Text style={styles.textStyle} >{`Max: ${dailyForecast?.Temperature?.Maximum.Value}°${dailyForecast?.Temperature?.Maximum.Unit}`}</Text>
                                    <Text style={styles.textStyle} >{`Min: ${dailyForecast?.Temperature?.Minimum.Value}°${dailyForecast?.Temperature?.Minimum.Unit}`}</Text>
                                </Fragment>
                            </Card>
                        )
                    })}
                </View>
            </ScrollView>
        </View >
    );
};

export default Home;

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
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 17,
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
