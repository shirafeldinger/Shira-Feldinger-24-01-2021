import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

export interface Temperature {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface CurrentWeather {
  EpochTime?: number;
  HasPrecipitation?: boolean;
  IsDayTime: boolean;
  Link?: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: any;
  Temperature: {
    Imperical: Temperature;
    Metric: Temperature;
  };
  WeatherIcon: number;
  WeatherText: string;
}

export interface DayNight {
  HasPrecipitation: boolean;
  Icon: number;
  IconPhrase: string;
}

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
export interface DailyForecasts {
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
}
export type FiveDaysForecast = {
  Headline: Headline | null;
  DailyForecasts: Array<DailyForecasts> | null;
};
export enum ActionTypes {
  SetCurrentWeather = 'SET_CURRENT_WEATHER',
  setFiveDaysForecast = 'SET_FIVE_DAYS_FORECAST',
  setLocation = 'SET_LOCATION',
  setSearchedCity = 'SET_SEARCHED_CITY',
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
  currentDay: CurrentWeather | null;
  fiveDaysForecast: FiveDaysForecast;
  location: Location | null;
  searchedCity: string;
};

export type WeatherActions =
  | {
      type: ActionTypes.SetCurrentWeather;
      currentDay: CurrentWeather | null;
    }
  | {
      type: ActionTypes.setFiveDaysForecast;
      fiveDaysForecast: FiveDaysForecast;
    }
  | {
      type: ActionTypes.setLocation;
      location: Location | null;
    }
  | {
      type: ActionTypes.setSearchedCity;
      searchedCity: string;
    };

export type RootStackParamList = {
  Home: undefined;
  Favoriets: undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};
