// src/app/models/chat.model.ts

// Represents a single phone's data structure
export interface Phone {
    id: string;
    name: string;
    brand: string;
    price_inr: number;
    display: { size_inches: number; refresh_hz: number; type: string };
    camera: { main_mp: number; ultrawide_mp: number; ois: boolean };
    battery: { capacity_mah: number; charging_watts: number };
    chipset: string;
    memory: { ram_gb: number; storage_gb: number };
    weight_g: number;
  }
  
  // Represents the structure of the API response from our backend
  export interface ApiResponse {
    explanation: string;
    action: 'search' | 'compare' | 'details' | 'general_query' | 'refusal';
    data: Phone[];
    is_safe: boolean;
  }
  
  // Represents a single message in the chat UI (from user or bot)
  export interface ChatMessage {
    sender: 'user' | 'bot';
    text?: string;         // For user's query or bot's explanation
    apiResponse?: ApiResponse; // To hold the rich response for the bot
  }