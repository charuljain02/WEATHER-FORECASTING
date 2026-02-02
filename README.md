# 🌦️ Weather Forecasting App (React + Vite)

A simple **Weather Forecasting App** built using **React**, **Context API**, and **WeatherAPI**.  
Users can check **current weather conditions** by searching a city or using their **current location**.

---

## 📁 Folder Structure

- `src/`
  - `api/`
    - `index.js` – Handles API calls
  - `components/`
    - `Button.jsx` – Reusable button component
    - `Card.jsx` – Displays weather information
    - `Input.jsx` – Input field for city search
  - `context/`
    - `Weather.jsx` – Weather context for global state
  - `App.jsx` – Main App component
  - `main.jsx` – Entry point
  - `index.css` – App styling

---

## 🔑 API Information

- **API Used:** WeatherAPI
- **Notes:**
  - API key is from the free tier
  - Free API keys may **expire after a limited period**
  - If the app stops showing data:
    - Generate a new API key from WeatherAPI
    - Update it in `src/api/index.js` or environment variables

---

## 📌 Important Note About City Names

- The displayed city name comes directly from the **WeatherAPI response**
- WeatherAPI may **normalize or auto-correct city names**
  - Example: `Delhi` → `New Delhi`
- This behavior is **expected** and not a bug

---

## ▶️ How to Run the Project Locally

- **Install dependencies:**
  ```bash
  npm install
Start development server:
npm run dev
Open in browser:
http://localhost:5173

---

## 📸 Screenshots

- **Weather App UI:**
  - Displays **current weather conditions**
  - Shows **temperature**, **weather icon**, and **location details**
  - Screenshot:

![Weather App Screenshot](./src/assets/image.png)

---
## 📄 License

- **License Type:** Learning & Educational Purposes  
- **Usage:**  
  - This project is meant for **practice, learning, and portfolio use**  
  - You are free to **view, clone, and learn** from this repository  
  - **Not intended for commercial use**  
- **Credits:**  
  - Weather data powered by **WeatherAPI**  
  - Built as a **learning project** to practice React, Context API, and API integration
