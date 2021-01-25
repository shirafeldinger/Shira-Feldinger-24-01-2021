/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { name as appName } from './app.json';
import { WeatherState, WeatherActions, ActionTypes } from './types';

export const AppWrapper = () => {
  const initialState = {
    currentDay: null,
    fiveDaysForecast: { Headline: null, DailyForecasts: null },
    location: null
  };

  const reducer = (state: WeatherState = initialState, action: WeatherActions): WeatherState => {
    switch (action.type) {
      case ActionTypes.SetCurrentWeather:
        return { ...state, currentDay: action.currentDay }
      case ActionTypes.setFiveDaysForecast:
        return { ...state, fiveDaysForecast: action.fiveDaysForecast }
      case ActionTypes.setLocation:
        return { ...state, location: action.location }
      default:
        return state;
    };
  };
  let store = createStore(reducer);


  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

AppRegistry.registerComponent(appName, () => AppWrapper);
