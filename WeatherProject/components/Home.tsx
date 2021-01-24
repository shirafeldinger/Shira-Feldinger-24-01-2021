import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDatsForeCastType, NavigationProps, WeatherState } from "../types";

const Home = ({ navigation }: NavigationProps) => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as Array<FiveDatsForeCastType>;
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCurrentWeather()
        fiveDaysForecasts()
    }, []);


    const fetchCurrentWeather = async () => {
        const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1'
        try {
            const res = await fetch(`${baseUrl}/215854?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
            const data = await res.json()

            if (data[0]) {
                dispatch({ type: ActionTypes.SetCurrentWeather, currentDay: data[0] });
            }
        } catch (err) {
            console.error('Error fetching data!!', err)
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
            console.error('Error fetching data!!', err)
        };
    }

    console.log(fiveDaysForecast);
    console.log(currentDay);

    return (
        <View style={styles.container}>

            <View>
                <Text>Current Weather:</Text>
                <Text>{currentDay?.WeatherText}</Text>
                <Text>{`${currentDay?.Temperature.Metric.Value}  ${currentDay?.Temperature.Metric.Unit}`}</Text>
            </View>
            {/* {
        fiveDaysForecast.map(day => {
          return (
            <Text>{day.Date.toString()}</Text>
          )
        })
      }; */}

            <Button title='favoriets' onPress={() => navigation.navigate('Favoriets')} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
