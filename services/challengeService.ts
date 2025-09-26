
import { Challenge, FunFact } from '../types';

const CHALLENGES: Challenge[] = [
    { id: 'c1', question: 'Show a map of at least 3 ARGO floats located in the Indian Ocean.' },
    { id: 'c2', question: 'What is the typical water temperature at a depth of 500 meters near the equator?' },
    { id: 'c3', question: 'List the 5 most recently deployed ARGO floats globally in a table.' },
    { id: 'c4', question: 'Display a salinity profile for any float in the North Atlantic.' },
    { id: 'c5', question: 'Compare temperature and pressure for a float in the Arabian Sea.' },
    { id: 'c6', question: 'Show the trajectory of float with WMO 6901423.' },
];

const FUN_FACTS: FunFact[] = [
    { id: 'f1', text: 'The ocean covers more than 70% of the Earth\'s surface, yet over 80% of it remains unexplored.' },
    { id: 'f2', text: 'The Mid-Ocean Ridge is the longest mountain range in the world, stretching over 65,000 kilometers beneath the ocean.' },
    { id: 'f3', text: 'ARGO floats are named after the ship "Argo" from Greek mythology, which Jason and the Argonauts sailed to find the Golden Fleece.' },
    { id: 'f4', text: 'Pressure at the bottom of the Mariana Trench is over 1,000 times the standard atmospheric pressure at sea level – like having 50 jumbo jets piled on top of you!' },
    { id: 'f5', text: 'The blue whale is the largest animal on Earth, and its heart is the size of a small car.' },
    { id: 'f6', text: 'Bioluminescence, the production of light by living organisms, is common in the deep sea where sunlight cannot penetrate.' },
    { id: 'f7', text: 'The global network of ARGO floats consists of almost 4,000 active floats, providing continuous data on ocean temperature and salinity.' },
];

export function getNewChallenge(completedIds: Set<string>): Challenge {
    const availableChallenges = CHALLENGES.filter(c => !completedIds.has(c.id));
    if (availableChallenges.length === 0) {
        return { id: 'done', question: 'You have completed all available challenges! Great job, master explorer!' };
    }
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    return availableChallenges[randomIndex];
}

export function getNewFunFact(unlockedIds: Set<string>): FunFact {
    const availableFacts = FUN_FACTS.filter(f => !unlockedIds.has(f.id));
     if (availableFacts.length === 0) {
        // If all facts are seen, just return a random one
        const randomIndex = Math.floor(Math.random() * FUN_FACTS.length);
        return FUN_FACTS[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    return availableFacts[randomIndex];
}
