import React from "react";
import { Sun, Activity, Eye, ShieldAlert, Compass, Droplets } from "lucide-react";

const MetricsGrid = ({ weather }) => {
    const getUVStatus = (uv) => {
        if (uv <= 2) return "Low";
        if (uv <= 5) return "Moderate";
        if (uv <= 7) return "High";
        return "Very High Alert";
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* UV Index Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-slate-500"><Sun className="w-4 h-4 text-amber-400" /><span className="text-[10px] tracking-wider uppercase font-medium">UV Index</span></div>
                <p className="text-xl font-extrabold">{weather.uv}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${weather.uv >= 8 ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{getUVStatus(weather.uv)}</span>
            </div>

            {/* Air Quality Index Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-slate-500"><Activity className="w-4 h-4 text-emerald-400" /><span className="text-[10px] tracking-wider uppercase font-medium">AQI Index</span></div>
                <p className="text-xl font-extrabold">{weather.aqi}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${weather.aqi > 150 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {weather.aqi <= 50 ? "Excellent" : weather.aqi <= 100 ? "Moderate" : "Unhealthy Atmosphere"}
                </span>
            </div>

            {/* Visibility Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5">
                <div className="flex justify-between text-slate-500"><Eye className="w-4 h-4 text-indigo-400" /><span className="text-[10px] tracking-wider uppercase font-medium">Visibility</span></div>
                <p className="text-xl font-extrabold">{weather.visibility} <span className="text-xs font-light text-slate-400">km</span></p>
                <p className="text-[10px] text-slate-500 font-medium">Standard Horizons</p>
            </div>

            {/* Barometric Pressure Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5">
                <div className="flex justify-between text-slate-500"><ShieldAlert className="w-4 h-4 text-teal-400" /><span className="text-[10px] tracking-wider uppercase font-medium">Pressure</span></div>
                <p className="text-xl font-extrabold">{weather.pressure} <span className="text-xs font-light text-slate-400">hPa</span></p>
                <p className="text-[10px] text-slate-500 font-medium">Barometric Vector</p>
            </div>

            {/* Compass Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5">
                <div className="flex justify-between text-slate-500"><Compass className="w-4 h-4 text-rose-400" /><span className="text-[10px] tracking-wider uppercase font-medium">Wind Compass</span></div>
                <p className="text-xl font-extrabold">{weather.windDir}</p>
                <p className="text-[10px] text-slate-500 font-medium">Direction Angle Bearing</p>
            </div>

            {/* Thermal Feel Card */}
            <div className="bg-[#1f2937]/15 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5">
                <div className="flex justify-between text-slate-500"><Droplets className="w-4 h-4 text-sky-400" /><span className="text-[10px] tracking-wider uppercase font-medium">Thermal Feel</span></div>
                <p className="text-xl font-extrabold">{weather.temp - 2}°C</p>
                <p className="text-[10px] text-slate-500 font-medium">Arid Evaporative Index</p>
            </div>
        </div>
    );
};

export default MetricsGrid;