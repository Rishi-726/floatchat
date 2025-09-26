import React from 'react';
import { Challenge } from '../types';
import { BulbIcon } from './icons/BulbIcon';

interface ChallengeDisplayProps {
    challenge: Challenge | null;
    isLoading: boolean;
}

const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({ challenge, isLoading }) => {
    if (!challenge) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-cyan-900/50 to-gray-900/30 border-b border-cyan-700/50 p-3 text-center">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-cyan-300">
                    <BulbIcon className="h-5 w-5" />
                    <span className="font-semibold uppercase tracking-wider">Ocean Challenge:</span>
                </div>
                <p className="text-gray-100 font-medium italic">"{challenge.question}"</p>
                {isLoading && (
                    <div className="flex items-center gap-2 text-yellow-300">
                         <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                         <span>Checking...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeDisplay;
