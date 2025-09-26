
import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Label } from 'recharts';
import { ProfileDataPoint, PlotConfig } from '../../types';

interface ProfilePlotProps {
    data: ProfileDataPoint[];
    config: PlotConfig;
}

const lineColors = ['#2DD4BF', '#F472B6', '#60A5FA', '#FBBF24', '#A78BFA'];

const ProfilePlot: React.FC<ProfilePlotProps> = ({ data, config }) => {
    const { xKey, yKey, xLabel, yLabel, lines } = config;
    
    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey={xKey} stroke="#9CA3AF" name={xLabel}>
                        <Label value={xLabel || xKey} offset={-15} position="insideBottom" fill="#E5E7EB" />
                    </XAxis>
                    <YAxis dataKey={yKey} reversed={true} stroke="#9CA3AF" name={yLabel}>
                         <Label value={yLabel || yKey} angle={-90} offset={0} position="insideLeft" fill="#E5E7EB" />
                    </YAxis>
                    <Tooltip
                         contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5567' }}
                         labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Legend wrapperStyle={{ color: '#F9FAFB' }} />
                    {lines.map((lineKey, index) => (
                         <Line 
                            key={lineKey}
                            type="monotone" 
                            dataKey={lineKey} 
                            stroke={lineColors[index % lineColors.length]} 
                            strokeWidth={2}
                            dot={false}
                            name={lineKey.charAt(0).toUpperCase() + lineKey.slice(1)}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfilePlot;
