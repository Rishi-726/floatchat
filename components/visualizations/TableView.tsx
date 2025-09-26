
import React from 'react';
import { TableData, TableConfig } from '../../types';

interface TableViewProps {
    data: TableData;
    config: TableConfig;
}

const TableView: React.FC<TableViewProps> = ({ data, config }) => {
    const { headers } = config;
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    
    // Use headers from config for ordering, fallback to object keys if not provided
    const displayHeaders = headers && headers.length > 0 ? headers : keys;

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                    <tr>
                        {displayHeaders.map((header) => (
                            <th key={header} scope="col" className="px-6 py-3">
                                {header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-gray-800/80 border-b border-gray-700 hover:bg-gray-700/60 transition-colors">
                           {displayHeaders.map((header) => (
                               <td key={`${rowIndex}-${header}`} className="px-6 py-4">
                                   {row[header] !== undefined ? String(row[header]) : 'N/A'}
                               </td>
                           ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableView;
