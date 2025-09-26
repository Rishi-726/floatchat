import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import FilterBar from './components/FilterBar';
import GamificationBar from './components/GamificationBar';
import AchievementToast from './components/AchievementToast';
import ChallengeDisplay from './components/ChallengeDisplay';
import FunFactModal from './components/FunFactModal';
import { ChatMessage, FilterState } from './types';
import { fetchChartData, validateChallengeAnswer } from './services/geminiService';
import { useGamification } from './hooks/useGamification';
import { useQuiz } from './hooks/useQuiz';

const App: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            id: 'initial',
            sender: 'ai',
            text: "Hello! I am your ARGO float data assistant. Use the filters above or ask me to visualize oceanographic data. For example: 'Show me salinity profiles near the equator in March 2023.'",
        }
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        region: 'Global',
        dataTypes: [],
    });

    const gamification = useGamification(chatHistory, filters);
    const quiz = useQuiz();

    const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);
    
    const createPromptWithFilters = (message: string, currentFilters: FilterState): string => {
        let prompt = `User query: "${message}"`;
        const appliedFilters: string[] = [];
        if (currentFilters.startDate && currentFilters.endDate) {
            appliedFilters.push(`from ${currentFilters.startDate} to ${currentFilters.endDate}`);
        }
        if (currentFilters.region && currentFilters.region !== 'Global') {
            appliedFilters.push(`in the ${currentFilters.region}`);
        }
        if (currentFilters.dataTypes.length > 0) {
            appliedFilters.push(`for parameters: ${currentFilters.dataTypes.join(', ')}`);
        }

        if (appliedFilters.length > 0) {
            prompt += `\n\nWith the following constraints applied: ${appliedFilters.join('; ')}. Please generate a response and visualization that respects these constraints.`;
        }
        return prompt;
    };


    const handleSendMessage = useCallback(async (messageText: string) => {
        if (!messageText.trim()) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            sender: 'user',
            text: messageText,
        };

        setChatHistory(prev => [...prev, userMessage]);
        setIsLoading(true);

        const fullPrompt = createPromptWithFilters(messageText, filters);

        try {
            const result = await fetchChartData(fullPrompt);
            const aiMessage: ChatMessage = {
                id: `ai-${Date.now()}`,
                sender: 'ai',
                text: result.responseText,
                visualization: result.visualization,
            };
            setChatHistory(prev => [...prev, aiMessage]);

            const xpGained = result.visualization?.type !== 'text_only' ? 15 : 5;
            gamification.addXp(xpGained, result.visualization?.type || 'text_only');

        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                sender: 'ai',
                text: "Sorry, I encountered an error while fetching data. Please try again.",
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [chatHistory, filters, gamification.addXp]);

    const handleChallengeSubmit = useCallback(async (message: ChatMessage) => {
        if (!quiz.currentChallenge || quiz.currentChallenge.id === 'done' || quiz.isCheckingAnswer) return;

        quiz.setIsCheckingAnswer(true);
        const { text, visualization } = message;
        const answerContext = `Text: ${text}\nVisualization Title: ${visualization?.title}\nVisualization Type: ${visualization?.type}`;

        const isCorrect = await validateChallengeAnswer(quiz.currentChallenge.question, answerContext);

        if (isCorrect) {
            const xpBonus = 50;
            gamification.addXp(xpBonus, 'challenge_completed');
            quiz.completeChallenge();
            
            const successMessage: ChatMessage = {
                id: `ai-challenge-correct-${Date.now()}`,
                sender: 'ai',
                text: `That's correct! You've solved the challenge. +${xpBonus} XP!`,
            };
            setChatHistory(prev => [...prev, successMessage]);

        } else {
             const tryAgainMessage: ChatMessage = {
                id: `ai-challenge-incorrect-${Date.now()}`,
                sender: 'ai',
                text: "That doesn't look quite right. Try adjusting your query to better match the challenge!",
            };
            setChatHistory(prev => [...prev, tryAgainMessage]);
        }
        quiz.setIsCheckingAnswer(false);

    }, [quiz.currentChallenge, quiz.isCheckingAnswer, gamification.addXp, quiz.completeChallenge]);


    return (
        <div className="h-screen w-screen flex flex-col font-sans">
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            
            <div className="flex flex-col flex-grow overflow-hidden">
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                <GamificationBar xp={gamification.xp} currentRank={gamification.currentRank} nextRank={gamification.nextRank} />
                <ChallengeDisplay challenge={quiz.currentChallenge} isLoading={quiz.isCheckingAnswer} />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar onQuerySelect={handleSendMessage} isOpen={isSidebarOpen} />
                    <main className="flex-1 h-full flex flex-col">
                         <ChatInterface
                            messages={chatHistory}
                            isLoading={isLoading}
                            onSendMessage={handleSendMessage}
                            onChallengeSubmit={handleChallengeSubmit}
                            activeChallenge={!!quiz.currentChallenge && quiz.currentChallenge.id !== 'done'}
                        />
                    </main>
                </div>
            </div>

            {gamification.lastUnlockedAchievement && (
                <AchievementToast 
                    achievement={gamification.lastUnlockedAchievement} 
                    onClose={() => gamification.setLastUnlockedAchievement(null)} 
                />
            )}
            
            {quiz.unlockedFunFact && (
                <FunFactModal
                    funFact={quiz.unlockedFunFact}
                    onClose={() => quiz.setUnlockedFunFact(null)}
                />
            )}
        </div>
    );
};

export default App;
