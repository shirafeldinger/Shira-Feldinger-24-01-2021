export const demiCurrent = {
  EpochTime: 1611599460,
  HasPrecipitation: false,
  IsDayTime: false,
  Link:
    'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  LocalObservationDateTime: '2021-01-25T20:15:00+02:00',
  MobileLink:
    'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  PrecipitationType: null,
  Temperature: {
    Imperical: {
      Unit: 'F',
      UnitType: 18,
      Value: 59,
    },
    Metric: {
      Unit: 'C',
      UnitType: 17,
      Value: 15.2,
    },
  },
  WeatherIcon: 33,
  WeatherText: 'clear',
};

export const demiFive = {
  Headline: {
    Category: 'rain',
    EffectiveDate: '2021-01-28T19:00:00+02:00',
    EffectiveEpochDate: 1611853200,
    EndDate: '2021-01-29T13:00:00+02:00',
    EndEpochDate: 1611918000,
    Link:
      'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
    MobileLink:
      'http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us',
    Severity: 4,
    Text: 'Expect rainy weather Thursday evening through Friday morning',
  },
  DailyForecasts: [
    {
      Date: '2021-01-25T07:00:00+02:00',
      Day: {
        HasPrecipitation: false,
        Icon: 2,
        IconPhrase: 'Mostly sunny',
      },
      Night: {
        HasPrecipitation: false,
        Icon: 33,
        IconPhrase: 'Clear',
      },
      Temperature: {
        Maximum: {
          Unit: 'F',
          UnitType: 18,
          Value: 64,
        },
        Minimum: {
          Unit: 'F',
          UnitType: 18,
          Value: 43,
        },
      },
    },
    {
      Date: '2021-01-26T07:00:00+02:00',
      Day: {
        HasPrecipitation: false,
        Icon: 4,
        IconPhrase: 'Intermittent clouds',
      },
      Night: {
        HasPrecipitation: false,
        Icon: 36,
        IconPhrase: 'Intermittent clouds',
      },
      Temperature: {
        Maximum: {
          Unit: 'F',
          UnitType: 18,
          Value: 72,
        },
        Minimum: {
          Unit: 'F',
          UnitType: 18,
          Value: 51,
        },
      },
    },
    {
      Date: '2021-01-27T07:00:00+02:00',
      Day: {
        HasPrecipitation: false,
        Icon: 4,
        IconPhrase: 'Intermittent clouds',
      },
      Night: {
        HasPrecipitation: false,
        Icon: 39,
        IconPhrase: 'Partly cloudy w/ showers',
      },
      Temperature: {
        Maximum: {
          Unit: 'F',
          UnitType: 18,
          Value: 74,
        },
        Minimum: {
          Unit: 'F',
          UnitType: 18,
          Value: 45,
        },
      },
    },
    {
      Date: '2021-01-28T07:00:00+02:00',
      Day: {
        HasPrecipitation: true,
        Icon: 4,
        IconPhrase: 'Intermittent clouds',
      },
      Night: {
        HasPrecipitation: true,
        Icon: 18,
        IconPhrase: 'Rain',
      },
      Temperature: {
        Maximum: {
          Unit: 'F',
          UnitType: 18,
          Value: 60,
        },
        Minimum: {
          Unit: 'F',
          UnitType: 18,
          Value: 44,
        },
      },
    },
    {
      Date: '2021-01-29T07:00:00+02:00',
      Day: {
        HasPrecipitation: true,
        Icon: 13,
        IconPhrase: 'Mostly cloudy w/ showers',
      },
      Night: {
        HasPrecipitation: false,
        Icon: 35,
        IconPhrase: 'Partly cloudy',
      },
      Temperature: {
        Maximum: {
          Unit: 'F',
          UnitType: 18,
          Value: 58,
        },
        Minimum: {
          Unit: 'F',
          UnitType: 18,
          Value: 42,
        },
      },
    },
  ],
};

export const demiLocal = [
  {
    AdministrativeArea: {
      ID: 'TA',
      LocalizedName: 'Tel Aviv',
    },
    Country: {
      ID: 'IL',
      LocalizedName: 'Israel',
    },
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Rank: 31,
    Type: 'City',
  },
];
