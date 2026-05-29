
# 🌤️ Hyper-Fidelity Weather Forecasting Dashboard

A modern, high-performance weather telemetry dashboard built with React, Vite, and Tailwind CSS v4. This application features live, debounced global autocomplete search indexing, client-side memory caching, dynamic geolocation tracking, and interactive microclimate metrics mapping using Recharts.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cd40becf-cf5b-4d3f-8e31-0d1f90880076" />

## 🚀 Core Features

* **Live Global Autocomplete API:** Fetches real-time matching global city coordinates on every keystroke using a custom debounce window (300ms) to preserve network bandwidth and protect API rate limits.
* **High-Fidelity UI/UX:** Built with a dark glassmorphic theme powered by Tailwind CSS v4, custom smooth scrollbar mechanics, and dynamic responsive layouts.
* **Client-Side Suggestion Caching:** Optimizes application performance by saving previous location query results to local memory, achieving 0ms latency on repeated keystrokes.
* **Complete Microclimate Metrics:** Displays UV Index alerts, Air Quality Data (AQI Index), humidity levels, barometric pressure, wind compass bearings, and visibility scales.
* **Interactive 24-Hour Timeline:** Visualizes upcoming temperature vectors seamlessly using interactive area charts.
* **Dynamic Search History:** Tracks and persists up to four recent lookups using browser `localStorage` integration.

## 🛠️ Technology Stack

* **Frontend Library:** React (Functional Components + Hooks)
* **Build Utility:** Vite (Fast Module Bundling)
* **Styling Engine:** Tailwind CSS v4 (Modern CSS Directives)
* **State Architecture:** React Context API (Unified Data Layers)
* **Data Visualization:** Recharts (Vector Graphic Mapping)
* **Icon Asset Matrix:** Lucide React

## 📦 Installation & Setup

1. **Clone the repository:**
   

git clone [https://github.com/charuljain02/WEATHER-FORECASTING](https://github.com/charuljain02/WEATHER-FORECASTING.git)
```
cd weather-forecasting
npm install

Create a .env file at the root of the project and add your WeatherAPI key:
Code snippet
VITE_WEATHER_API_KEY

npm run dev

```

---
## 🚀 Core Features

* **Live Global Autocomplete API:** Fetches real-time matching global city coordinates on every keystroke using a custom debounce window (300ms) to preserve network bandwidth and protect API rate limits.
* **High-Fidelity UI/UX:** Built with a dark glassmorphic theme powered by Tailwind CSS v4, custom smooth scrollbar mechanics, and dynamic responsive layouts.
* **Client-Side Suggestion Caching:** Optimizes application performance by saving previous location query results to local memory, achieving 0ms latency on repeated keystrokes.
* **Complete Microclimate Metrics:** Displays UV Index alerts, Air Quality Data (AQI Index), humidity levels, barometric pressure, wind compass bearings, and visibility scales.
* **Interactive 24-Hour Timeline:** Visualizes upcoming temperature vectors seamlessly using interactive area charts.
* **Dynamic Search History:** Tracks and persists up to four recent lookups using browser `localStorage` integration.

---
## 🛠️ Technology Stack

* **Frontend Library:** React (Functional Components + Hooks)
* **Build Utility:** Vite (Fast Module Bundling)
* **Styling Engine:** Tailwind CSS v4 (Modern CSS Directives)
* **State Architecture:** React Context API (Unified Data Layers)
* **Data Visualization:** Recharts (Vector Graphic Mapping)
* **Icon Asset Matrix:** Lucide React
  
