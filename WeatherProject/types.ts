import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

export interface Temperature {
    Unit: string;
    UnitType: number;
    Value: number;
  };
  
  export interface CurrentWeather {
    EpochTime: number;
    HasPrecipitation: boolean;
    IsDayTime: boolean;
    Link: string;
    LocalObservationDateTime: string;
    MobileLink: string;
    PrecipitationType: any;
    Temperature: {
      Imperical: Temperature,
      Metric: Temperature
    }
    WeatherIcon: number;
    WeatherText: string;
  };
  
  export interface DayNight {
    HasPrecipitation: boolean;
    Icon: number;
    IconPhrase: string;
  }
  export interface FiveDatsForeCastType {
    Date: Date,
    Day: DayNight,
    EpochDate: number;
    Link: string;
    MobileLink: string;
    Night: DayNight;
    Maximum: Temperature;
    Minimum: Temperature;
  };


  export enum ActionTypes {
    SetCurrentWeather = 'SET_CURRENT_WEATHER',
    setFiveDaysForecast ='SET_FIVE_DAYS_FORECAST'
};


  export type WeatherState = {
    currentDay:CurrentWeather | null,
    fiveDaysForecast:Array<FiveDatsForeCastType>,
  };

  export type WeatherActions = {
    type: ActionTypes.SetCurrentWeather;
    currentDay:CurrentWeather | null
  } | {
    type: ActionTypes.setFiveDaysForecast;
    fiveDaysForecast: Array<FiveDatsForeCastType>;
  };

  export type RootStackParamList = {
    Home: undefined;
    Favoriets: undefined;
  };

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};
