const baseURL = 
"https://api.weatherapi.com/v1/current.json?key=eae20207b91a4142b90180155260102"

export const getWeatherDataForCity=async(city)=>{
    const response = await fetch(`${baseURL}&q=${city}&aqi=yes`)
    //data ko json me parse karke return kar diya
    return await response.json();
};
export const getWeatherDataForLocation = async (lat, lon) => {
    const response = await fetch(`${baseURL}&q=${lat},${lon}&aqi=yes`)
    return await response.json();
};
