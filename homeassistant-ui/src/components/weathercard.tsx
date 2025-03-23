import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";

interface HassEntityAttributeBase {
  friendly_name?: string;
  entity_id?: string;
  last_changed?: string;
  last_updated?: string;
}

type HassEntityAttributes = HassEntityAttributeBase & { [key: string]: any };

const WEATHER_ICON_MAP: Record<string, string> = {
  "clear-night": "clear-night.svg",
  "cloudy": "cloudy.svg",
  "fog": "fog.svg",
  "lightning-rainy": "thunderstorm.svg",
  "partlycloudy": "cloudy-1-day.svg",
  "pouring": "rain-heavy.svg",
  "rainy": "rain.svg",
  "snowy": "snow.svg",
  "snowy-rainy": "sleet.svg",
  "sunny": "clear-day.svg",
};

function getWeatherIcon(state: string): string {
  return `/animated/${WEATHER_ICON_MAP[state] || "unknown.svg"}`;
}

interface WeatherIconProps {
  state: string | null;
  size: number;
}

interface WeatherForecast {
  condition: string;
  datetime: string;
  humidity: number;
  precipitation: number;
  precipitation_probability: number;
  temperature: number;
  templow: number;
  uv_index: number;
  wind_bearing: number;
  wind_gust_speed: number;
  wind_speed: number;
}

interface WeatherForecastResponse {
  response: Record<string, { forecast: WeatherForecast[] }>;
}

const getWeekday = (dateString: string) => {
  const date = new Date(dateString);
  const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
  return weekdays[date.getDay()];
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ state, size }) => {
  if (!state) return null;

  return <img src={getWeatherIcon(state)} className={`w-${size}`} alt={state} />;
};

function WeatherCard() {
  const [weatherState, setWeatherState] = useState<string | null>(null);
  const [weatherAttributes, setWeatherAttributes] = useState<HassEntityAttributes | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const { entities, connection } = useWebSocket();

  useEffect(() => {
    const interval = setInterval(() => {
      if (entities) {
        const weatherState = entities["weather.forecast_koti"]?.state;
        setWeatherState(weatherState);
        const weatherAttributes = entities["weather.forecast_koti"]?.attributes;
        setWeatherAttributes(weatherAttributes);
      }
    }, 1000)

    async function fetchForecast() {
      console.log(connection);
      if (connection) {
        try {
          console.log("Sending request for forecast...");
          const forecast: WeatherForecastResponse = await connection.sendMessagePromise({
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            return_response: true,
            service_data: {
              entity_id: "weather.forecast_koti",
              type: "daily",
            },
          });

          console.log("Forecast response:", forecast);
          const forecastData = forecast.response["weather.forecast_koti"]?.forecast || [];
          console.log(forecastData)
          setWeatherForecast(forecastData || []);
        } catch (error) {
          console.error("Failed to fetch weather forecast:", error);
        }
      }
    }

    fetchForecast();

    return () => clearInterval(interval)
  }, [entities]);

  return (
    <div className="transition-all p-5 rounded-2xl text-2xl">
      <div className='flex'>
        <WeatherIcon state={weatherState} size={64} />
        <div>
          <div className='text-8xl'>
            {weatherAttributes?.temperature}
            {weatherAttributes?.temperature_unit}
          </div>
          <div className='flex'>
            <FontAwesomeIcon icon={faArrowUp} className='mx-2 mt-1' size='xl' style={{ transform: `rotate(${parseFloat(weatherAttributes?.wind_bearing)}deg)` }} />
            <p className='pt-2'>{weatherAttributes?.wind_speed} ({weatherAttributes?.wind_gust_speed}) {weatherAttributes?.wind_speed_unit}</p>
            <img src='/animated/wind.svg' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-5 grid-rows-4 max-h-35 place-items-start ml-5'>
        {weatherForecast.length > 0 ? (
          weatherForecast.slice(0, 5).map((forecast, index) => (
            <div key={index} className={`col-start-${index + 1} row-start-1`}>
              {getWeekday(forecast.datetime)}
            </div>
          ))
        ) : (
          <div className="col-span-5">Loading forecast...</div>
        )}

        {weatherForecast.length > 0 ? (
          weatherForecast.slice(0, 5).map((forecast, index) => (
            <div key={index} className={`col-start-${index + 1} row-start-2`}>
              <WeatherIcon state={forecast.condition} size={8} />
            </div>
          ))
        ) : (
          <div className="col-span-5">Loading forecast...</div>
        )}

        {weatherForecast.length > 0 ? (
          weatherForecast.slice(0, 5).map((forecast, index) => (
            <div key={index} className={`col-start-${index + 1} row-start-3`}>
              <p>{forecast.temperature} {weatherAttributes?.temperature_unit} </p>
            </div>
          ))
        ) : (
          <div className="col-span-5">Loading forecast...</div>
        )}

        {weatherForecast.length > 0 ? (
          weatherForecast.slice(0, 5).map((forecast, index) => (
            <div key={index} className={`col-start-${index + 1} row-start-4 opacity-45`}>
              <p>{forecast.templow} {weatherAttributes?.temperature_unit} </p>
            </div>
          ))
        ) : (
          <div className="col-span-5">Loading forecast...</div>
        )}
      </div>
    </div>
  )

}

export default WeatherCard;
