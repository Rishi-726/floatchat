
import React from 'react';

export const BulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M15.09 16.05A6.5 6.5 0 0 1 8.91 9.95" />
        <path d="M9 17h6" />
        <path d="M12 21v-2" />
        <path d="M4.22 10.22l1.42 1.42" />
        <path d="M1 17h2" />
        <path d="M21 17h2" />
        <path d="M18.36 11.64l1.42-1.42" />
        <path d="M12 3a6.5 6.5 0 0 0-6.5 6.5c0 2.28 1.13 4.29 2.85 5.5" />
    </svg>
);
