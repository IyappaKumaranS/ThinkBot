// types.ts
export interface ValidationScores {
    validationScore: number;
    uniquenessScore: number;
    marketTrendScore: number;
    userEngagementScore: number;
  }
  
  export interface FormData {
    project_description: string;
    domain_name: string;
    target_audience: string;
    financial_viability: string;
    profitability: string;
  }
  
  export interface ChatMessage {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }
  
  export interface FileData {
    file: File | null;
    fileName: string;
    fileContent: string | null;
  }