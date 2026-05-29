import React, { useState } from "react";
import { Search, MapPin, Wind, Droplets, Clock, Sun, Eye, ShieldAlert, Compass, Activity } from "lucide-react";
import { useWeather } from "./context/Weather";
import WeatherChart from "./components/WeatherChart";
import MetricsGrid from "./components/MetricsGrid";

const App = () => {
    const { 
        searchCity, 
        setSearchCity, 
        suggestions,      // Grabbed from your upgraded context stream
        setSuggestions,   // Grabbed from your upgraded context stream
        data, 
        fetchData, 
        fetchCurrentUserLocationData,
        history,
        loading,
        triggerDirectHistorySearch
    } = useWeather();

    // Controls dropdown visibility toggle state locally
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#111827]/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
                
                {/* Visual Accent Glows */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                {/* LEFT CONTROL PANEL */}
                <div className="lg:border-r border-slate-800/60 lg:pr-6 flex flex-col justify-between space-y-6 z-10">
                    <div className="space-y-4 relative"> {/* Added relative here to absolute position the dropdown */}
                        
                        {/* Search Bar Row */}
                        <div className="flex items-center gap-2 relative z-30">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search for a city..."
                                    value={searchCity || ""} 
                                    onChange={(e) => {
                                        setSearchCity(e.target.value);
                                        setIsOpen(true);
                                    }}
                                    onFocus={() => setIsOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            fetchData();
                                            setIsOpen(false);
                                        }
                                    }}
                                    className="w-full bg-[#1f2937]/50 border border-slate-700 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-4 outline-none text-sm transition-all text-white placeholder:text-slate-500"
                                />
                            </div>
                            <button 
                                onClick={fetchCurrentUserLocationData} 
                                className="bg-[#1f2937]/50 border border-slate-700 hover:border-cyan-400 p-2.5 rounded-xl transition-all text-cyan-400"
                                title="Use Current Location"
                            >
                                <MapPin className={`w-4 h-4 ${loading ? 'animate-bounce' : ''}`} />
                            </button>
                        </div>

                        {/* HIGH-FIDELITY LIVE SUGGESTIONS OVERLAY */}
                        {isOpen && searchCity && searchCity.trim().length > 0 && (
                            <>
                                {/* Click-Away Shield to close modal securely if clicking dashboard area */}
                                <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                                
                                <div className="absolute top-[54px] left-0 right-0 bg-[#111827]/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-20 max-h-[280px] overflow-y-auto">
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 py-2 border-b border-slate-800/60 mb-1">
                                        Matching Global Coordinates
                                    </div>

                                    {suggestions && suggestions.length > 0 ? (
                                        suggestions.map((city, idx) => (
                                            <button
                                                key={city.id || idx}
                                                onClick={() => {
                                                    setSearchCity(city.name);
                                                    triggerDirectHistorySearch(city.name);
                                                    setSuggestions([]); // Flush suggestion arrays out
                                                    setIsOpen(false);   // Shut overlay panel drawer
                                                }}
                                                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all group duration-150"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                                    <div className="truncate max-w-[180px]">
                                                        <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
                                                            {city.name}
                                                        </span>
                                                        {city.region && (
                                                            <span className="text-xs text-slate-400 ml-1.5 truncate">
                                                                , {city.region}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-mono tracking-wider bg-slate-800 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 px-2 py-0.5 rounded uppercase font-bold transition-all">
                                                    {city.country}
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-xs text-slate-500 px-3 py-4 text-center">
                                            Scanning global database...
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Recent Search Tokens */}
                        {history && history.length > 0 && (
                            <div className="flex gap-2 flex-wrap items-center">
                                <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Recent:
                                </span>
                                {history.map((city, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => triggerDirectHistorySearch(city)} 
                                        className="text-xs bg-[#1f2937]/30 border border-slate-800 hover:border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 transition-all"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Temperature Display */}
                    {data ? (
                        <div className="py-8 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">{data.city}</h1>
                                    <p className="text-slate-400 text-sm font-medium">{data.country}</p>
                                </div>
                                <span className="text-xs font-mono px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full uppercase tracking-widest">
                                    Live
                                </span>
                            </div>
                            <div className="flex items-baseline py-4">
                                <span className="text-7xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                                    {data.temp}
                                </span>
                                <span className="text-3xl font-light text-cyan-400">°C</span>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-slate-200">{data.condition}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-500 text-sm font-medium">
                            {loading ? "Syncing weather maps..." : "Search a city or use your location to load weather metrics."}
                        </div>
                    )}

                    {/* Primary Fast Metrics */}
                    {data && (
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/60">
                            <div className="bg-[#1f2937]/20 border border-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                                <Wind className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <p className="text-[10px] uppercase text-slate-500 font-medium">Wind Speed</p>
                                    <p className="text-xs font-bold">{data.windSpeed} km/h</p>
                                </div>
                            </div>
                            <div className="bg-[#1f2937]/20 border border-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                                <Droplets className="w-5 h-5 text-blue-400" />
                                <div>
                                    <p className="text-[10px] uppercase text-slate-500 font-medium">Humidity</p>
                                    <p className="text-xs font-bold">{data.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT DASHBOARD CONSOLE (CHARTS AND PARAMETERS GRID) */}
                <div className="lg:col-span-2 space-y-6 flex flex-col justify-between z-10">
                    {data ? (
                        <>
                            <WeatherChart hourlyData={data.hourly} />
                            <MetricsGrid weather={data} />
                        </>
                    ) : (
                        <div className="h-full min-h-[350px] flex items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-[#1f2937]/5">
                            <p className="text-sm text-slate-500">Waiting for system coordinates...</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default App;