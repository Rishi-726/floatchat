
import React, { useEffect, useState } from 'react';
import { Achievement } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';

interface AchievementToastProps {
    achievement: Achievement;
    onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Enter animation
        setVisible(true);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300); // Allow time for exit animation
    };

    return (
        <div 
            className={`fixed top-5 right-5 w-80 bg-gray-800 border-2 border-yellow-400 rounded-lg shadow-2xl p-4 text-white transform transition-all duration-300 ease-in-out ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-center">
                <TrophyIcon className="h-10 w-10 text-yellow-400 mr-4" />
                <div>
                    <p className="font-bold text-yellow-300">Achievement Unlocked!</p>
                    <p className="text-lg font-semibold">{achievement.name}</p>
                    <p className="text-sm text-gray-300 mt-1">{achievement.description}</p>
                    <p className="text-sm text-cyan-400 font-bold mt-2">+{achievement.xpBonus} XP</p>
                </div>
            </div>
             <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                aria-label="Close"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default AchievementToast;
