
import React, { useEffect, useState } from 'react';
import { FunFact } from '../types';
import { BulbIcon } from './icons/BulbIcon';

interface FunFactModalProps {
    funFact: FunFact;
    onClose: () => void;
}

const FunFactModal: React.FC<FunFactModalProps> = ({ funFact, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for animation
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fun-fact-title"
        >
            <div
                className={`bg-gray-800 rounded-xl shadow-2xl border-2 border-cyan-400 p-8 w-full max-w-lg text-center transform transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
            >
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-cyan-500/20 rounded-full mb-4">
                        <BulbIcon className="h-10 w-10 text-cyan-300" />
                    </div>
                    <h2 id="fun-fact-title" className="text-2xl font-bold text-cyan-300 mb-2">
                        Fun Fact Unlocked!
                    </h2>
                    <p className="text-lg text-gray-200 italic leading-relaxed">
                        "{funFact.text}"
                    </p>
                    <button
                        onClick={handleClose}
                        className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
                        aria-label="Close fun fact"
                    >
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FunFactModal;
