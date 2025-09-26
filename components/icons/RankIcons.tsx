
import React from 'react';

export const PlanktonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <circle cx="12" cy="12" r="2" />
    </svg>
);

export const KrillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 10 C8 10, 8 14, 12 14 S16 14, 16 10" />
        <path d="M11 10V8" />
        <path d="M13 10V8" />
        <path d="M10 14v2" />
        <path d="M14 14v2" />
    </svg>
);

export const TurtleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z" />
        <path d="M2 12h5" />
        <path d="M17 12h5" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M5.6 5.6l3.5 3.5" />
        <path d="M14.9 14.9l3.5 3.5" />
        <path d="M5.6 18.4l3.5-3.5" />
        <path d="M14.9 9.1l3.5-3.5" />
    </svg>
);

export const DolphinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 13c3.1-2 6.3-2 9.5-2s6.4 0 9.5 2" />
        <path d="M16 11c-1.5-3-6-3.5-8-2-1.5 1-2.5 3-2.5 5 0 2.2 1.8 4 4 4h5c2.2 0 4-1.8 4-4 0-1.5-1-3-2.5-4z" />
        <path d="M18 10c-1-2-4-2-4-2" />
    </svg>
);

export const WhaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12c2.5-1.5 5.5-2 9-2s6.5.5 9 2" />
        <path d="M21 12v3c0 2.2-1.8 4-4 4h-1a4 4 0 0 1-4-4v-3" />
        <path d="M10 12v3c0 2.2-1.8 4-4 4H5a4 4 0 0 1-4-4v-3" />
        <path d="M17 9.5c.3-.3.5-.7.5-1.1C17.5 7.1 16.4 6 15 6s-2.5 1.1-2.5 2.4c0 .4.2.8.5 1.1" />
        <path d="M12 5v2" />
    </svg>
);
