import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SendIcon } from './icons/SendIcon';
import { ArgoLogo } from './icons/ArgoLogo';
import VisualizationRenderer from './visualizations/VisualizationRenderer';
import { SubmitIcon } from './icons/SubmitIcon';
import { exportToCSV } from '../utils/exportUtils';

interface ChatInterfaceProps {
    messages: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onChallengeSubmit: (message: ChatMessage) => void;
    activeChallenge: boolean;
}

const LoadingBubble: React.FC = () => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700/80 flex items-center justify-center border-2 border-gray-600">
            <ArgoLogo className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="flex items-center space-x-1 p-3 bg-gray-800 rounded-xl rounded-tl-none mt-2">
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
    </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage, onChallengeSubmit, activeChallenge }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const handleExport = (message: ChatMessage) => {
        if(message.visualization && message.visualization.type === 'table') {
            exportToCSV(
                message.visualization.data,
                message.visualization.tableConfig?.headers,
                `${message.visualization.title.replace(/\s/g, '_') || 'argo_data'}.csv`
            );
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700/80 flex items-center justify-center border-2 border-gray-600">
                                <ArgoLogo className="h-6 w-6 text-cyan-400" />
                            </div>
                        )}
                        <div className={`max-w-2xl w-full shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl rounded-br-none' : 'bg-gray-800/90 border border-gray-700/50 rounded-2xl rounded-tl-none'}`}>
                             <div className="p-4">
                                <p className="text-white whitespace-pre-wrap text-base">{msg.text}</p>
                            </div>
                            {msg.visualization && msg.visualization.type !== 'text_only' && (
                                <div className="p-2 md:p-4 bg-gray-900/50 border-t border-gray-700/50">
                                    <VisualizationRenderer 
                                        visualization={msg.visualization}
                                        onExport={() => handleExport(msg)}
                                    />
                                </div>
                            )}
                             {msg.sender === 'ai' && msg.id !== 'initial' && activeChallenge && (
                                <div className="border-t border-gray-700/50 p-2 text-center">
                                    <button 
                                        onClick={() => onChallengeSubmit(msg)}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 hover:text-yellow-200 bg-yellow-600/20 hover:bg-yellow-600/40 px-3 py-1 rounded-full transition-colors"
                                    >
                                        <SubmitIcon className="h-4 w-4" />
                                        Submit as Answer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && <LoadingBubble />}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-900/30 backdrop-blur-sm border-t border-gray-700/50">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3 max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about ARGO data..."
                        disabled={isLoading}
                        className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 text-white placeholder-gray-400 text-lg"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="p-3 bg-cyan-600 rounded-full text-white hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 transform hover:scale-105"
                    >
                        <SendIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
