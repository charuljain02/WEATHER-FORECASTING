import { createContext, useContext, useState, useEffect } from "react";
import { getWeatherDataForCity, getWeatherDataForLocation, getCitySuggestions } from "../api";

const WeatherContext = createContext(null);

export const useWeather = () => {
    return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
    const [data, setData] = useState(null);
    const [searchCity, setSearchCity] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Storage matrix for API matches
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sync search history from local storage when the app first loads
    useEffect(() => {
        const cached = localStorage.getItem("weather_history");
        if (cached) setHistory(JSON.parse(cached));
    }, []);

    // WATCHER: Listens to the keystrokes inside the search bar for suggestions
    useEffect(() => {
        if (!searchCity || searchCity.trim().length === 0) {
            setSuggestions([]);
            return;
        }

        // Debounce: Waits 300ms for you to finish typing before requesting the endpoint
        const debounceTimer = setTimeout(async () => {
            const apiMatches = await getCitySuggestions(searchCity);
            
            // CRITICAL FIX: Save the raw array directly into state so it doesn't break!
            setSuggestions(Array.isArray(apiMatches) ? apiMatches : []);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchCity]);

    // Helper utility to enrich standard API data with premium elements
    const structurePremiumTelemetry = (apiRawResponse) => {
        if (!apiRawResponse) return null;

        return {
            ...apiRawResponse,
            city: apiRawResponse.location?.name || apiRawResponse.city || "Unknown Location",
            country: apiRawResponse.location?.country || apiRawResponse.country || "Global",
            temp: apiRawResponse.current?.temp_c ?? apiRawResponse.temp ?? 25,
            condition: apiRawResponse.current?.condition?.text || apiRawResponse.condition || "Clear",
            humidity: apiRawResponse.current?.humidity ?? apiRawResponse.humidity ?? 50,
            windSpeed: apiRawResponse.current?.wind_kph ?? apiRawResponse.windSpeed ?? 10,
            windDir: apiRawResponse.current?.wind_dir || apiRawResponse.windDir || "E",
            uv: apiRawResponse.current?.uv ?? apiRawResponse.uv ?? 4,
            visibility: apiRawResponse.current?.vis_km ?? apiRawResponse.visibility ?? 10,
            pressure: apiRawResponse.current?.pressure_mb ?? apiRawResponse.pressure ?? 1012,
            aqi: apiRawResponse.current?.air_quality?.pm2_5 ? Math.round(apiRawResponse.current.air_quality.pm2_5) : (apiRawResponse.aqi || 95),
            hourly: apiRawResponse.forecast?.forecastday?.[0]?.hour?.map(h => ({
                time: h.time.split(" ")[1],
                temp: h.temp_c
            })) || [
                { time: "06:00 AM", temp: 24 }, { time: "12:00 PM", temp: 32 },
                { time: "04:00 PM", temp: 35 }, { time: "08:00 PM", temp: 28 }
            ]
        };
    };

    const fetchData = async () => {
        if (!searchCity || !searchCity.trim()) return;
        setLoading(true);
        try {
            const response = await getWeatherDataForCity(searchCity);
            const enrichedData = structurePremiumTelemetry(response);
            setData(enrichedData);

            if (enrichedData) {
                setHistory((prev) => {
                    const filtered = prev.filter(item => item.toLowerCase() !== searchCity.toLowerCase().trim());
                    const updated = [enrichedData.city, ...filtered].slice(0, 4);
                    localStorage.setItem("weather_history", JSON.stringify(updated));
                    return updated;
                });
            }
        } catch (error) {
            console.error("Telemetry fetch failing:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUserLocationData = () => {
        if (!navigator.geolocation) return alert("Geolocation tracking is blocked by client system.");
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherDataForLocation(
                    position.coords.latitude,
                    position.coords.longitude
                ).then((response) => {
                    setData(structurePremiumTelemetry(response));
                    setLoading(false);
                }).catch(() => setLoading(false));
            },
            () => setLoading(false)
        );
    };

    return (
        <WeatherContext.Provider
            value={{
                searchCity,
                data,
                suggestions, // Added to export stream
                history,
                loading,
                setSearchCity,
                setSuggestions, // Added to clear suggestions manually on selection
                fetchData,
                fetchCurrentUserLocationData,
                triggerDirectHistorySearch: (city) => {
                    setSearchCity(city);
                    setLoading(true);
                    getWeatherDataForCity(city).then((res) => {
                        setData(structurePremiumTelemetry(res));
                        setLoading(false);
                    });
                }
            }}
        >
            {props.children}
        </WeatherContext.Provider>
    );
};