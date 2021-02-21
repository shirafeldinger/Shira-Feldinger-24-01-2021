import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Dispatch, SetStateAction} from 'react';

export type Temperature = {
  Unit: string;
  UnitType: number;
  Value: number;
};
export type CurrentWeather = {
  EpochTime?: number;
  HasPrecipitation?: boolean;
  IsDayTime: boolean;
  Link?: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: any;
  Temperature: {
    Imperial: Temperature;
    Metric: Temperature;
  };
  WeatherIcon: number;
  WeatherText: string;
};

export type DayNight = {
  HasPrecipitation: boolean;
  Icon: number;
  IconPhrase: string;
};

export type Headline = {
  Category?: string;
  EffectiveDate?: string;
  EffectiveEpochDate?: number;
  EndDate?: string;
  EndEpochDate?: number;
  Link?: string;
  MobileLink?: string;
  Severity: 4;
  Text: string;
};
export type DailyForecasts = {
  Date: string;
  Day: DayNight;
  EpochDate?: number;
  Link?: string;
  MobileLink?: string;
  Night: DayNight;
  Temperature: {
    Maximum: Temperature;
    Minimum: Temperature;
  };
};
export type FiveDaysForecast = {
  Headline: Headline | undefined;
  DailyForecasts: Array<DailyForecasts> | undefined;
};
export enum ActionTypes {
  SetCurrentWeather = 'SET_CURRENT_WEATHER',
  setFiveDaysForecast = 'SET_FIVE_DAYS_FORECAST',
  setLocation = 'SET_LOCATION',
  setSearchedCity = 'SET_SEARCHED_CITY',
  setFavorites = 'SET_FAVORITES',
}

export type Location = {
  LocalizedName: string;
  Country: {ID: string; LocalizedName: string};
  AdministrativeArea: {ID: string; LocalizedName: string};
  Key: string;
  Rank: number;
  Type: string;
  Verison: number;
};

export type WeatherState = {
  currentDay: CurrentWeather | undefined;
  fiveDaysForecast: FiveDaysForecast;
  location: Location | undefined;
  searchedCity: string;
  favorites: Array<Favorite>;
};

export type WeatherActions =
  | {
      type: ActionTypes.SetCurrentWeather;
      currentDay: CurrentWeather | undefined;
    }
  | {
      type: ActionTypes.setFiveDaysForecast;
      fiveDaysForecast: FiveDaysForecast;
    }
  | {
      type: ActionTypes.setLocation;
      location: Location | undefined;
    }
  | {
      type: ActionTypes.setSearchedCity;
      searchedCity: string;
    }
  | {
      type: ActionTypes.setFavorites;
      favorites: Array<Favorite>;
    };

export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};

export type Favorite = {
  currentWeather: string;
  id: string;
  name: string;
  temperatureValue: number;
  temperatureUnit: string;
  icon: number;
};

export type themeProps = {
  themeIndex: number;
  setThemeIndex: Dispatch<SetStateAction<number>>;
};
