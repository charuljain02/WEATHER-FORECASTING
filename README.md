
## folder structure
src/
│── api/
│   └── index.js          # API calls
│
│── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Input.jsx
│
│── context/
│   └── Weather.jsx       # Weather Context
│
│── App.jsx
│── main.jsx
│── index.css

## 🔑 API Information

This project uses WeatherAPI to fetch weather data.

⚠️ Note:

The API key is from the free tier
Free API keys may expire after a limited period
If the app stops showing data, generate a new API key from WeatherAPI and update it in the API file or environment variables

## 📌 Important Note About City Names

The displayed city name comes directly from the WeatherAPI response
WeatherAPI may normalize or auto-correct city names
(for example, Delhi → New Delhi)
This is expected API behavior, not a bug

## How to Run the Project Locally
npm install
npm run dev

Open your browser and visit:
http://localhost:5173

## 📸 Screenshots

![Weather App Screenshot](./src/assets/image.png)


## Future Improvements (Optional)

3–5 day weather forecast
Loading and error states
Better UI / animations
Move API key to .env file
Mobile responsiveness

## Acknowledgements
Weather data powered by WeatherAPI
Built as a learning project to practice React, Context API, and API integration

## License
This project is for learning and educational purposes