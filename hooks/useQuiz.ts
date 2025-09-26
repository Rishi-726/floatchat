import { useState, useEffect, useCallback } from 'react';
import { Challenge, FunFact } from '../types';
import { getNewChallenge, getNewFunFact } from '../services/challengeService';

export const useQuiz = () => {
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
    const [completedChallengeIds, setCompletedChallengeIds] = useState<Set<string>>(() => {
         const savedChallenges = localStorage.getItem('argo_completed_challenges');
        return savedChallenges ? new Set(JSON.parse(savedChallenges)) : new Set();
    });
    
    const [unlockedFunFact, setUnlockedFunFact] = useState<FunFact | null>(null);
    const [unlockedFunFactIds, setUnlockedFunFactIds] = useState<Set<string>>(() => {
        const savedFunFacts = localStorage.getItem('argo_unlocked_funfacts');
        return savedFunFacts ? new Set(JSON.parse(savedFunFacts)) : new Set();
    });

    const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
    
    useEffect(() => {
        localStorage.setItem('argo_completed_challenges', JSON.stringify(Array.from(completedChallengeIds)));
    }, [completedChallengeIds]);

    useEffect(() => {
        localStorage.setItem('argo_unlocked_funfacts', JSON.stringify(Array.from(unlockedFunFactIds)));
    }, [unlockedFunFactIds]);

    useEffect(() => {
        // Load the first challenge on startup, considering completed ones
        if (!currentChallenge) {
            setCurrentChallenge(getNewChallenge(completedChallengeIds));
        }
    }, [completedChallengeIds, currentChallenge]);

    const completeChallenge = useCallback(() => {
        if (currentChallenge) {
            const newCompletedIds = new Set(completedChallengeIds).add(currentChallenge.id);
            setCompletedChallengeIds(newCompletedIds);
            
            const newFunFact = getNewFunFact(unlockedFunFactIds);
            setUnlockedFunFact(newFunFact);

            const newUnlockedFactIds = new Set(unlockedFunFactIds).add(newFunFact.id);
            setUnlockedFunFactIds(newUnlockedFactIds);
            
            // Set next challenge
            setCurrentChallenge(getNewChallenge(newCompletedIds));
        }
    }, [currentChallenge, completedChallengeIds, unlockedFunFactIds]);

    return {
        currentChallenge,
        unlockedFunFact,
        isCheckingAnswer,
        setUnlockedFunFact,
        setIsCheckingAnswer,
        completeChallenge,
    };
};
