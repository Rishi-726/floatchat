import React from 'react';
import { ArgoLogo } from './icons/ArgoLogo';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    return (
        <header className="flex items-center p-4 border-b border-gray-700/50 bg-gray-900/30 backdrop-blur-sm shadow-md z-20 flex-shrink-0">
            <button 
                onClick={onToggleSidebar} 
                className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors mr-3"
                aria-label="Toggle sidebar"
            >
                <MenuIcon className="h-6 w-6 text-gray-300" />
            </button>
            <ArgoLogo className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl font-bold ml-3 text-gray-100 tracking-wider">
                ARGO AI Data Explorer
            </h1>
        </header>
    );
};

export default Header;
