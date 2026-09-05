export interface ExchangeConfig {
  cnyToKgsRate: number;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  workHours: {
    openHour: number;
    openMinute: number;
    closeHour: number;
    closeMinute: number;
    timezoneOffset: number; // UTC+6 for Bishkek
    displayString: string;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarBg: string;
  city: string;
  amount: string;
  platform: 'WhatsApp' | 'Instagram';
  date: string;
  message: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: string;
    icon?: string;
  }[];
  externalLink?: {
    url: string;
    text: string;
  };
}
