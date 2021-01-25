import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes, CurrentWeather, FiveDatsForeCastType, NavigationProps, WeatherState } from "../types";

const Home = ({ navigation }: NavigationProps) => {
    const currentDay = useSelector<WeatherState>(state => state.currentDay) as CurrentWeather;
    const fiveDaysForecast = useSelector<WeatherState>(state => state.fiveDaysForecast) as Array<FiveDatsForeCastType>;
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
            const res = await fetch(`${baseUrl}/q=${input}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`)
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
    }

    console.log(fiveDaysForecast);
    console.log(currentDay);

    let demiCurrent: CurrentWeather = {
        EpochTime: 1611599460,
        HasPrecipitation: false,
        IsDayTime: false,
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        LocalObservationDateTime: "2021-01-25T20:15:00+02:00",
        MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        PrecipitationType: null,
        Temperature: {
            Imperical: {
                Unit: "F",
                UnitType: 18,
                Value: 59
            },
            Metric: {
                Unit: "C",
                UnitType: 17,
                Value: 15.2,
            }
        },
        WeatherIcon: 33,
        WeatherText: "clear"

    };

    let demiFive: Array<FiveDatsForeCastType> = [{
        Date: "2021-01-25T07:00:00+02:00",
        Day: {
            HasPrecipitation: false,
            Icon: 2,
            IconPhrase: "Mostly sunny"
        },
        Night: {
            HasPrecipitation: false,
            Icon: 33,
            IconPhrase: "Clear"
        },
        Maximum: {
            Unit: "F",
            UnitType: 18,
            Value: 64,
        },
        Minimum: {
            Unit: "F",
            UnitType: 18,
            Value: 43,
        }
    }, {
        Date: "2021-01-26T07:00:00+02:00",
        Day: {
            HasPrecipitation: false,
            Icon: 4,
            IconPhrase: "Intermittent clouds"
        },
        Night: {
            HasPrecipitation: false,
            Icon: 36,
            IconPhrase: "Intermittent clouds"
        },
        Maximum: {
            Unit: "F",
            UnitType: 18,
            Value: 72,
        },
        Minimum: {
            Unit: "F",
            UnitType: 18,
            Value: 51,
        }
    }, {
        Date: "2021-01-27T07:00:00+02:00",
        Day: {
            HasPrecipitation: false,
            Icon: 4,
            IconPhrase: "Intermittent clouds"
        },
        Night: {
            HasPrecipitation: false,
            Icon: 39,
            IconPhrase: "Partly cloudy w/ showers"
        },
        Maximum: {
            Unit: "F",
            UnitType: 18,
            Value: 74,
        },
        Minimum: {
            Unit: "F",
            UnitType: 18,
            Value: 45,
        }
    }, {
        Date: "2021-01-28T07:00:00+02:00",
        Day: {
            HasPrecipitation: true,
            Icon: 4,
            IconPhrase: "Intermittent clouds"
        },
        Night: {
            HasPrecipitation: true,
            Icon: 18,
            IconPhrase: "Rain"
        },
        Maximum: {
            Unit: "F",
            UnitType: 18,
            Value: 60,
        },
        Minimum: {
            Unit: "F",
            UnitType: 18,
            Value: 44,
        }
    }, {
        Date: "2021-01-29T07:00:00+02:00",
        Day: {
            HasPrecipitation: true,
            Icon: 13,
            IconPhrase: "Mostly cloudy w/ showers"
        },
        Night: {
            HasPrecipitation: false,
            Icon: 35,
            IconPhrase: "Partly cloudy"
        },
        Maximum: {
            Unit: "F",
            UnitType: 18,
            Value: 58,
        },
        Minimum: {
            Unit: "F",
            UnitType: 18,
            Value: 42,
        }

    }]


    return (
        <View style={styles.container}>
            <TextInput style={styles.inputStyle}
                onChangeText={text => setInput(text)}
                value={input} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Current Weather:</Text>
                <Text>{currentDay?.WeatherText}</Text>
            </View>

            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{`${currentDay?.Temperature.Metric.Value}  ${currentDay?.Temperature.Metric.Unit}`}</Text>
            </View>
            {/* {
        fiveDaysForecast.map(day => {
          return (
            <Text>{day.Date.toString()}</Text>
          )
        })
      }; */}

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
        flex: 1

    }
});
