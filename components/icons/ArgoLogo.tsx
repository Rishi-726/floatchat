
import React from 'react';

export const ArgoLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 11.13c-2.29-.5-4.25-1.5-5.5-2.63" />
        <path d="M17.5 8.5c-1.25 1.13-3.21 2.13-5.5 2.63" />
        <path d="M12 15.63c-2.29.5-4.25 1.5-5.5 2.63" />
        <path d="M17.5 18.26c-1.25-1.13-3.21-2.13-5.5-2.63" />
    </svg>
);
