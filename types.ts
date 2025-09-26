
export type Sender = 'user' | 'ai';

export interface ChatMessage {
    id: string;
    sender: Sender;
    text: string;
    visualization?: VisualizationData;
}

export interface FilterState {
    startDate: string;
    endDate: string;
    region: string;
    dataTypes: string[];
}

export interface MapDataPoint {
    lat: number;
    lon: number;
    label?: string;
    [key: string]: any;
}

export interface ProfileDataPoint {
    depth: number;
    temperature?: number;
    salinity?: number;
    pressure?: number;
    [key: string]: any;
}

export type TableData = Record<string, string | number>[];


export interface PlotConfig {
    xKey: string;
    yKey: string;
    yLabel?: string;
    xLabel?: string;
    lines: string[];
}

export interface TableConfig {
    headers: string[];
}


export interface VisualizationData {
    type: 'map' | 'profile_plot' | 'table' | 'text_only';
    title: string;
    data: (MapDataPoint[] | ProfileDataPoint[] | TableData);
    plotConfig?: PlotConfig;
    tableConfig?: TableConfig;
}

export interface GeminiResponse {
    responseText: string;
    visualization: VisualizationData;
}

// --- Gamification Types ---
export interface Rank {
    name: string;
    minXp: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    xpBonus: number;
    condition: (chatHistory: ChatMessage[], vizType: string, filters: FilterState) => boolean;
}

// --- Quiz & Fun Fact Types ---
export interface Challenge {
    id: string;
    question: string;
}

export interface FunFact {
    id: string;
    text: string;
}
