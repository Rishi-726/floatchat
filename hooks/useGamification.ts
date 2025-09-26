import { useState, useEffect, useCallback } from 'react';
import { Achievement, ChatMessage, FilterState, Rank } from '../types';
import { RANKS, ACHIEVEMENTS, getRankForXp } from '../services/gamificationService';

export const useGamification = (chatHistory: ChatMessage[], filters: FilterState) => {
    const [xp, setXp] = useState<number>(() => {
        const savedXp = localStorage.getItem('argo_xp');
        return savedXp ? JSON.parse(savedXp) : 0;
    });

    const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(() => {
        const savedAchievements = localStorage.getItem('argo_achievements');
        return savedAchievements ? new Set(JSON.parse(savedAchievements)) : new Set();
    });

    const [lastUnlockedAchievement, setLastUnlockedAchievement] = useState<Achievement | null>(null);

    const currentRank = getRankForXp(xp);
    const nextRank = RANKS[RANKS.indexOf(currentRank) + 1] || null;

    useEffect(() => {
        localStorage.setItem('argo_xp', JSON.stringify(xp));
    }, [xp]);

    useEffect(() => {
        localStorage.setItem('argo_achievements', JSON.stringify(Array.from(unlockedAchievements)));
    }, [unlockedAchievements]);

    const checkForNewAchievements = useCallback((visualizationType: string) => {
        const newlyUnlocked = ACHIEVEMENTS.find(ach => 
            !unlockedAchievements.has(ach.id) && ach.condition(chatHistory, visualizationType, filters)
        );

        if (newlyUnlocked) {
            setLastUnlockedAchievement(newlyUnlocked);
            setUnlockedAchievements(prev => new Set(prev).add(newlyUnlocked.id));
            setXp(prev => prev + newlyUnlocked.xpBonus);
        }
    }, [unlockedAchievements, chatHistory, filters]);

    const addXp = useCallback((amount: number, visualizationType: string) => {
        setXp(prev => prev + amount);
        // We check for achievements *after* a potential state update
        // by passing the vizType directly.
        // A more robust solution might use useEffect on chatHistory change.
        setTimeout(() => checkForNewAchievements(visualizationType), 100);
    }, [checkForNewAchievements]);

    return {
        xp,
        currentRank,
        nextRank,
        unlockedAchievements,
        lastUnlockedAchievement,
        setLastUnlockedAchievement,
        addXp,
    };
};
