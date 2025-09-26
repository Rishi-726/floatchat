
import React from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, Label } from 'recharts';
import { MapDataPoint } from '../../types';

interface MapViewProps {
    data: MapDataPoint[];
}

const MapView: React.FC<MapViewProps> = ({ data }) => {
    return (
        <div className="w-full h-80 bg-blue-900/20 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis 
                        type="number" 
                        dataKey="lon" 
                        name="Longitude" 
                        domain={[-180, 180]} 
                        ticks={[-180, -90, 0, 90, 180]}
                        stroke="#9CA3AF"
                    >
                         <Label value="Longitude" offset={-25} position="insideBottom" fill="#E5E7EB" />
                    </XAxis>
                    <YAxis 
                        type="number" 
                        dataKey="lat" 
                        name="Latitude" 
                        domain={[-90, 90]}
                        ticks={[-90, -45, 0, 45, 90]}
                        stroke="#9CA3AF"
                    >
                        <Label value="Latitude" angle={-90} offset={-25} position="insideLeft" fill="#E5E7EB" />
                    </YAxis>
                    <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5567' }}
                        labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Scatter name="Floats" data={data} fill="#2DD4BF" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MapView;
