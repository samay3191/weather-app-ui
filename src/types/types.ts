export type WeatherStation = {
  id: number;
  ws_name: string;
  site: string;
  portfolio: string;
  state: string;
  latitude: number;
  longitude: number;
};

export type Variable = {
  id: number;
  weather_station_id: number;
  name: string;
  long_name: string;
  unit: string;
};

export type WeatherData = {
  id: number;
  weather_station_id: number;
  variable_id: number;
  value: string;
  timestamp: string;
  name: string;
  long_name: string;
  unit: string;
};
