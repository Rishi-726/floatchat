
import React from 'react';
import { FilterState } from '../types';
import { FilterIcon } from './icons/FilterIcon';

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const DATA_TYPES = ["Temperature", "Salinity", "Pressure", "Oxygen"];
const REGIONS = ["Global", "Indian Ocean", "Arabian Sea", "Equatorial Pacific", "North Atlantic"];

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    
    const handleDataTypeChange = (dataType: string) => {
        const currentTypes = filters.dataTypes;
        const newTypes = currentTypes.includes(dataType)
            ? currentTypes.filter(t => t !== dataType)
            : [...currentTypes, dataType];
        onFilterChange({ dataTypes: newTypes });
    };

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm p-3 border-b border-gray-700 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                    <FilterIcon className="h-5 w-5" />
                    <h3 className="font-semibold tracking-wide">FILTERS:</h3>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-2">
                    <label htmlFor="start-date" className="text-gray-300">From:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={filters.startDate}
                        onChange={(e) => onFilterChange({ startDate: e.target.value })}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="end-date" className="text-gray-300">To:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={filters.endDate}
                        onChange={(e) => onFilterChange({ endDate: e.target.value })}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                {/* Region */}
                <div className="flex items-center gap-2">
                    <label htmlFor="region" className="text-gray-300">Region:</label>
                    <select
                        id="region"
                        value={filters.region}
                        onChange={(e) => onFilterChange({ region: e.target.value })}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                
                {/* Data Types */}
                <div className="flex items-center gap-4">
                     <span className="text-gray-300">Parameters:</span>
                     <div className="flex items-center gap-3">
                        {DATA_TYPES.map(type => (
                            <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.dataTypes.includes(type)}
                                    onChange={() => handleDataTypeChange(type)}
                                    className="h-4 w-4 rounded bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-600 cursor-pointer"
                                />
                                <span className="text-gray-200">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
