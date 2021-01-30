import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from "react-native";
import { Text, Card, Button } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDaysForecast, WeatherState, Location, Favorite } from "../types";
import Toast from 'react-native-toast-message';
import { useTheme } from '@react-navigation/native';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import { iconsImages } from '../resources/iconsSwitch';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const dimensions = Dimensions.get('window');
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
    const [errors, setErrors] = useState('');


    const styles = StyleSheet.create({
        inputStyle: {
            borderColor: 'gray',
            borderWidth: 1,
            width: '50%',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: dimensions.width < 350 ? 12 : 17,
        },

        labelStyle: {
            textTransform: 'capitalize',
            textAlign: 'center',
            color: colors.text
        },
        textStyle: {
            textAlign: 'center',
            fontSize: dimensions.width < 350 ? 12 : 17,
            color: colors.text
        },
        imageStyle: {
            width: 50,
            height: 50,
            alignSelf: 'center'
        },
        fiveDaysForecastView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonStyle: {
            height: dimensions.width < 350 ? 30 : 45,
        },
        inputView: {
            alignItems: 'center',
            justifyContent: 'center', flexDirection: 'row',
            margin: dimensions.width < 350 ? '2%' : '5%',
        }

    });

    useEffect(() => {
        if (currentDay) {
            setCurrentToggleTempValue(currentDay.Temperature.Imperial.Value)
            setLoading(false)
        }
    }, [currentDay])

    useEffect(() => {
        setLoading(true);
        fetchLocation().then((key: string) => {
            Promise.all([fetchCurrentWeather(key), fiveDaysForecasts(key)]).then(() => {
            }).catch(error => {
                setErrors(`${error}`);
                setLoading(false)
                Toast.show({
                    text1: errors,
                    type: 'error',
                    visibilityTime: 3000,
                    autoHide: true,
                    position: 'bottom'
                });
            });
        }).catch(error => {
            setErrors(`${error}`);
            setLoading(false)
            Toast.show({
                text1: errors,
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom'
            });
        });
    }, [searchedCity]);

    const fetchLocation = async (): Promise<string> => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        try {
            const res = await fetch(`${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${searchedCity}`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.setLocation, location: data[0] });
                return Promise.resolve(data[0]?.Key as string);
            } else {
                dispatch({ type: ActionTypes.setSearchedCity, searchedCity: 'Tel Aviv' });
                return Promise.reject("could find location");

            }
        } catch (err) {
            setErrors(`${err}`);
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
                return Promise.resolve();
            } else {
                return Promise.reject("could find current weather");
            }
        } catch (err) {
            setErrors(`${err}`);
            return Promise.reject(err);
        };
    };


    const fiveDaysForecasts = async (key: string) => {
        const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day'
        try {
            const res = await fetch(`${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json();
            if (data) {
                dispatch({ type: ActionTypes.setFiveDaysForecast, fiveDaysForecast: data });
                return Promise.resolve();
            } else {
                return Promise.reject("could find weekly weather");
            }
        } catch (err) {
            setErrors(`${err}`);
            return Promise.reject(err);
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
        let cityIndex = newFavorites.findIndex(favorite => favorite.name == location.LocalizedName)
        if (cityIndex == -1) {
            newFavorites.push({
                temperatureValue: currentDay.Temperature.Metric.Value, temperatureUnit: currentDay.Temperature.Metric.Unit,
                currentWeather: currentDay.WeatherText, id: location.Key, name: location.LocalizedName, icon: currentDay.WeatherIcon
            });
            dispatch({ type: ActionTypes.setFavorites, favorites: newFavorites });
        } else {
            const removeFavorites = newFavorites.filter(favorite => favorite.name !== location.LocalizedName);
            dispatch({ type: ActionTypes.setFavorites, favorites: removeFavorites })
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
        (loading ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text h1 style={styles.textStyle} >Loading...</Text>
                <ActivityIndicator size="large" color="#3399ff" />
            </View> :
            <KeyboardAwareScrollView>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputStyle}
                        onChangeText={text => { text.replace(/[^A-Za-z]/ig, ''); setInput(text) }}
                        placeholder="Search City..."
                        placeholderTextColor={colors.text}
                        value={input} />
                    <EvilIcon onPress={searchedValidation} name={'search'} size={25} style={{ position: 'absolute', right: '27%' }} />
                </View>

                <View style={{ margin: dimensions.width < 350 ? '2%' : '5%', }}  >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {favorites.some(favorite => favorite.name == location.LocalizedName) ?
                            <EvilIcon name='heart' color='red' size={40}></EvilIcon> : null
                        }
                        <Text h4 style={styles.labelStyle}>Current Weather in {`${location.LocalizedName}`}:</Text>

                        <Text style={styles.textStyle}>{currentDay.WeatherText}</Text>
                        <Image style={styles.imageStyle} source={iconsImages(currentDay.WeatherIcon)} />

                        <View>
                            <Text style={styles.textStyle}>{`${currentToggleTempValue}°${toggleTempUnit}`}</Text>
                            <TouchableOpacity onPress={() => toggleTempUnits(toggleTempUnit, currentToggleTempValue)}>
                                <Text style={[styles.textStyle, { color: '#3399ff' }]}>Press to change units</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', margin: "2%" }}>
                        <Button buttonStyle={styles.buttonStyle} title={favorites.some(favorite => favorite.name == location.LocalizedName) ? 'Remove from favorites' : 'Add to favorites'} onPress={handleFavorites} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text h4 style={styles.labelStyle} > next 5 day forecast:</Text>
                        <Text style={[styles.textStyle, { width: '90%' }]}>{fiveDaysForecast?.Headline?.Text}</Text>
                    </View>

                </View>

                <ScrollView horizontal={true}>
                    <View style={styles.fiveDaysForecastView}>
                        {fiveDaysForecast?.DailyForecasts?.map(dailyForecast => {
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
            </KeyboardAwareScrollView >
        )
    )

};

export default Home;
