import {useDispatch, useSelector} from 'react-redux';
import {ActionTypes, WeatherState} from './types';

const useFetches = (): {
  fetchLocation: () => Promise<string>;
  fiveDaysForecasts: (key: string) => Promise<void>;
  fetchCurrentWeather: (key: string) => Promise<void>;
} => {
  const dispatch = useDispatch();
  const searchedCity = useSelector<WeatherState>(
    (state) => state.searchedCity,
  ) as string;

  const fetchLocation = async (): Promise<string> => {
    const baseUrl =
      'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    try {
      const res = await fetch(
        `${baseUrl}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx&q=${searchedCity}`,
      );
      const data = await res.json();

      if (data[0]) {
        dispatch({type: ActionTypes.setLocation, location: data[0]});
        return Promise.resolve(data[0]?.Key as string);
      } else {
        dispatch({type: ActionTypes.setSearchedCity, searchedCity: 'Tel Aviv'});
        return Promise.reject('could find location');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const fetchCurrentWeather = async (key: string) => {
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1';
    try {
      const res = await fetch(
        `${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`,
      );
      const data = await res.json();
      if (data[0]) {
        dispatch({type: ActionTypes.SetCurrentWeather, currentDay: data[0]});
        return Promise.resolve();
      } else {
        return Promise.reject('could find current weather');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const fiveDaysForecasts = async (key: string) => {
    const baseUrl =
      'http://dataservice.accuweather.com/forecasts/v1/daily/5day';
    try {
      const res = await fetch(
        `${baseUrl}/${key}?apikey=AajKuPVPSQaHeVqfDiMiscjqoUbACFMx`,
      );
      const data = await res.json();
      if (data) {
        dispatch({
          type: ActionTypes.setFiveDaysForecast,
          fiveDaysForecast: data,
        });
        return Promise.resolve();
      } else {
        return Promise.reject('could find weekly weather');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {fetchLocation, fiveDaysForecasts, fetchCurrentWeather};
};

export default useFetches;
