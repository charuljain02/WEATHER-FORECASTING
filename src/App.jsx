import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";
import { useWeather } from "./context/Weather";
import "./App.css";
import { useEffect } from "react";

function App() {
  const weather = useWeather();
  console.log(weather);

  useEffect(() => {
    weather.fetchCurrentUserLocationData();
  }, []);

  return (
    <div className="App">
      <h1>Weather ForeCast</h1>
      <Input />
      <Button onClick={weather.fetchData} value="Search" />
      <Card />
      <Button
        value="Refresh"
        onClick={weather.fetchCurrentUserLocationData}
      />
    </div>
  );
}

export default App;
