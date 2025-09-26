import React from 'react';
import { VisualizationData, MapDataPoint, ProfileDataPoint, TableData } from '../../types';
import MapView from './MapView';
import ProfilePlot from './ProfilePlot';
import TableView from './TableView';
import { ExportIcon } from '../icons/ExportIcon';

interface VisualizationRendererProps {
    visualization: VisualizationData;
    onExport: () => void;
}

const VisualizationRenderer: React.FC<VisualizationRendererProps> = ({ visualization, onExport }) => {
    const { type, title, data, plotConfig, tableConfig } = visualization;

    const renderContent = () => {
        switch (type) {
            case 'map':
                return <MapView data={data as MapDataPoint[]} />;
            case 'profile_plot':
                if (!plotConfig) return <p>Plot configuration is missing.</p>;
                return <ProfilePlot data={data as ProfileDataPoint[]} config={plotConfig} />;
            case 'table':
                 if (!tableConfig) return <p>Table configuration is missing.</p>;
                return <TableView data={data as TableData} config={tableConfig} />;
            case 'text_only':
                return null;
            default:
                return <p>Unknown visualization type.</p>;
        }
    };

    return (
        <div className="bg-gray-800/70 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                {type === 'table' && (
                    <button 
                        onClick={onExport}
                        className="flex items-center gap-2 text-sm text-cyan-300 hover:text-white bg-cyan-600/20 hover:bg-cyan-600/40 px-3 py-1 rounded-md transition-colors"
                        title="Export as CSV"
                    >
                        <ExportIcon className="h-4 w-4" />
                        Export
                    </button>
                )}
            </div>
            <div className="p-2 md:p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default VisualizationRenderer;
