// Pulling credentials securely from Vite's environment runtime
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// 1. LIVE AUTOCOMPLETE SUGGESTIONS ENDPOINT
export const getCitySuggestions = async (query) => {
    if (!query || query.trim().length === 0) return [];
    try {
        const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
        if (!response.ok) throw new Error("Autocomplete API failed");
        return await response.json(); 
    } catch (error) {
        console.error("Autocomplete search layer failure:", error);
        return [];
    }
};

// 2. DETAILED WEATHER DATA BY CITY
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

// 3. DETAILED WEATHER DATA BY COORDINATES
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