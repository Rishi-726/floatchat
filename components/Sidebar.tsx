import React from 'react';

interface SidebarProps {
    onQuerySelect: (query: string) => void;
    isOpen: boolean;
}

const exampleQueries = [
    "Show me salinity profiles near the equator in March 2023",
    "Compare Temperature and Salinity in the Arabian Sea for the last 6 months",
    "What are the nearest ARGO floats to 15°N, 65°E?",
    "List the 5 most recently deployed BGC floats",
    "Show the trajectory of float WMO 6901423",
];

const Sidebar: React.FC<SidebarProps> = ({ onQuerySelect, isOpen }) => {
    return (
        <aside 
            className={`transition-all duration-300 ease-in-out bg-gray-800/60 border-r border-gray-700/50 flex flex-col flex-shrink-0 ${isOpen ? 'w-64 lg:w-72 p-5' : 'w-0 p-0 overflow-hidden'}`}
        >
            <div className="overflow-y-auto overflow-x-hidden space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-cyan-400 mb-2 whitespace-nowrap">Welcome</h2>
                    <p className="text-sm text-gray-400">
                        Use natural language to query, explore, and visualize oceanographic information from ARGO floats.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3 whitespace-nowrap">Try these examples</h3>
                    <ul className="space-y-2">
                        {exampleQueries.map((query, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => onQuerySelect(query)}
                                    className="text-sm text-left text-gray-300 hover:text-cyan-300 transition-colors duration-200 p-2 rounded-md hover:bg-white/5 w-full"
                                >
                                    "{query}"
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
