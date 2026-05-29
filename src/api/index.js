// We separate the base URL and the key so we can cleanly target different endpoints
const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "eae20207b91a4142b90180155260102";

// 1. LIVE AUTOCOMPLETE SUGGESTIONS ENDPOINT (For when you type a letter like 'K')
export const getCitySuggestions = async (query) => {
    if (!query || query.trim().length === 0) return [];
    try {
        const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
        if (!response.ok) throw new Error("Autocomplete API failed");
        return await response.json(); // Returns array of matches: [{name, region, country}, ...]
    } catch (error) {
        console.error("Autocomplete search layer failure:", error);
        return [];
    }
};

// 2. DETAILED WEATHER DATA BY CITY (Upgraded to forecast.json for Recharts support)
export const getWeatherDataForCity = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes`);
        if (!response.ok) throw new Error("City weather API failed");
        return await response.json();
    } catch (error) {
        console.error("Weather data fetch error:", error);
        return null;
    }
};

// 3. DETAILED WEATHER DATA BY COORDINATES (Upgraded to forecast.json for Geolocation chart support)
export const getWeatherDataForLocation = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=yes`);
        if (!response.ok) throw new Error("Location weather API failed");
        return await response.json();
    } catch (error) {
        console.error("Location coordinate fetch error:", error);
        return null;
    }
};