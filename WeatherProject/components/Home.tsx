import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDaysForecast, NavigationProps, WeatherState } from "../types";
import { demiCurrent, demiFive } from "../demiData"

const Home = ({ navigation }: NavigationProps) => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as FiveDaysForecast;
    const dispatch = useDispatch();
    const [input, setInput] = useState(`Tel Aviv`)

    useEffect(() => {
        // fetchCurrentWeather()
        // fiveDaysForecasts()
        // fetchLocation()
    }, []);


    const fetchLocation = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        try {
            const res = await fetch(`${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${input}`)
            const data = await res.json()

            if (data) {
                console.log(data);

            }
        } catch (err) {
            console.error('Fetch location error', err)
        };
    };


    const fetchCurrentWeather = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1'
        try {
            const res = await fetch(`${baseUrl}/215854?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
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
            const res = await fetch(`${baseUrl}/215854?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()

            if (data) {
                dispatch({ type: ActionTypes.setFiveDaysForecast, fiveDaysForecast: data });
            }
        } catch (err) {
            console.error('five days error', err)
        };
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputStyle}
                onChangeText={text => setInput(text)}
                value={input} />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Current Weather:</Text>
                    <Text>Tel Aviv</Text>
                    <Text>{demiCurrent.WeatherText}</Text>
                    <Text>{demiCurrent.Temperature.Metric.Value}{demiCurrent.Temperature.Metric.Unit}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>5-day forecast:</Text>
                    <Text style={styles.headlineStyle}>{demiFive.Headline.Text}</Text>
                </View>
                <View style={styles.fiveDaysForecastView}>
                    {demiFive.DailyForecasts.map(dailyForecast => {
                        const date = new Date(dailyForecast.Date).toString();
                        const spaceIndex = date.indexOf(' ')
                        return (
                            <View key={dailyForecast.Date} style={styles.dailyForecastView}>
                                <Text style={{ textAlign: 'center' }}>{date.substr(0, spaceIndex)}</Text>
                                <Text style={{ textAlign: 'center' }}>{`Max:${dailyForecast?.Temperature?.Maximum.Value}${dailyForecast?.Temperature?.Maximum.Unit}`}</Text>
                                <Text style={{ textAlign: 'center' }} >{`Min:${dailyForecast?.Temperature?.Minimum.Value}${dailyForecast?.Temperature?.Minimum.Unit}`}</Text>
                            </View>
                        )
                    })}
                </View>


            </View>

        </View>
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
    },
    headlineStyle: {
        fontSize: 23,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    fiveDaysForecastView: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dailyForecastView: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },

});
