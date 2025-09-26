
import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M12 9a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" />
        <path d="M6 15h12" />
        <path d="M6 15a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z" />
        <path d="M18 15a6 6 0 0 1 6 6H12a6 6 0 0 1 6-6z" />
    </svg>
);
