import React from 'react';
import { Rank } from '../types';

interface GamificationBarProps {
    xp: number;
    currentRank: Rank;
    nextRank: Rank | null;
}

const GamificationBar: React.FC<GamificationBarProps> = ({ xp, currentRank, nextRank }) => {
    
    const xpForNextRank = nextRank ? nextRank.minXp - currentRank.minXp : 0;
    const xpInCurrentRank = xp - currentRank.minXp;
    const progress = nextRank ? (xpInCurrentRank / xpForNextRank) * 100 : 100;

    return (
        <div className="bg-gray-900/30 p-2 border-b border-gray-700/50 shadow-inner">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2" title="Your current exploration rank">
                    <span className="font-semibold text-cyan-400">Rank:</span>
                    <currentRank.icon className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold text-gray-100">{currentRank.name}</span>
                </div>

                <div className="flex items-center gap-2 w-1/3" title={`XP: ${xp} / ${nextRank ? nextRank.minXp : 'Max'}`}>
                    <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                        <div 
                            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center gap-2" title="Total Exploration Points">
                    <span className="font-semibold text-cyan-400">XP:</span>
                    <span className="font-bold text-gray-100">{xp}</span>
                </div>
            </div>
        </div>
    );
};

export default GamificationBar;
