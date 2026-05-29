import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const WeatherChart = ({ hourlyData }) => {
    return (
        <div className="bg-[#1f2937]/20 border border-slate-800/60 rounded-2xl p-4 flex flex-col h-[240px]">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" /> 
                24-Hour Microclimate Forecasting Matrix
            </h3>
            <div className="flex-1 w-full min-h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tempGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '12px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '11px' }}
                            itemStyle={{ color: '#06b6d4', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#tempGlow)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeatherChart;