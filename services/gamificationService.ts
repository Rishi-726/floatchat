
import { Rank, Achievement, ChatMessage } from '../types';
import { PlanktonIcon, KrillIcon, TurtleIcon, DolphinIcon, WhaleIcon } from '../components/icons/RankIcons';

export const RANKS: Rank[] = [
    { name: 'Plankton', minXp: 0, icon: PlanktonIcon },
    { name: 'Krill', minXp: 100, icon: KrillIcon },
    { name: 'Sea Turtle', minXp: 250, icon: TurtleIcon },
    { name: 'Dolphin', minXp: 500, icon: DolphinIcon },
    { name: 'Orca', minXp: 1000, icon: WhaleIcon },
];

export const getRankForXp = (xp: number): Rank => {
    return RANKS.slice().reverse().find(rank => xp >= rank.minXp) || RANKS[0];
};

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_query',
        name: 'First Step',
        description: 'You\'ve made your first query into the vast ocean of data!',
        xpBonus: 20,
        condition: (chatHistory: ChatMessage[]) => chatHistory.filter(m => m.sender === 'user').length === 1,
    },
    {
        id: 'cartographer',
        name: 'Cartographer',
        description: 'Generated your first map visualization.',
        xpBonus: 30,
        condition: (_, vizType) => vizType === 'map',
    },
    {
        id: 'oceanographer',
        name: 'Oceanographer',
        description: 'Generated your first depth profile plot.',
        xpBonus: 30,
        condition: (_, vizType) => vizType === 'profile_plot',
    },
    {
        id: 'data_librarian',
        name: 'Data Librarian',
        description: 'Generated your first data table.',
        xpBonus: 30,
        condition: (_, vizType) => vizType === 'table',
    },
    {
        id: 'curious_explorer',
        name: 'Curious Explorer',
        description: 'Asked 5 different questions.',
        xpBonus: 50,
        condition: (chatHistory) => chatHistory.filter(m => m.sender === 'user').length >= 5,
    },
    {
        id: 'filter_pro',
        name: 'Filter Pro',
        description: 'Used a date, region, and parameter filter all at once.',
        xpBonus: 75,
        condition: (chatHistory, vizType, filters) =>
            !!filters.startDate &&
            filters.region !== 'Global' &&
            filters.dataTypes.length > 0,
    },
];
