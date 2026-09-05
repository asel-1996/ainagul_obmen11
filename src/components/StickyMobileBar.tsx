import React from 'react';
import { MessageCircle, TrendingUp } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface StickyMobileBarProps {
  currentRate: number;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ currentRate }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-medium">Бүгүнкү курс:</span>
        <span className="text-xs font-black text-emerald-400 font-mono flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-red-500" />
          1 CNY = {currentRate.toFixed(2)} сом
        </span>
      </div>

      <a
        href={createWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        id="sticky-whatsapp-cta"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 active:scale-98 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 text-center"
      >
        <MessageCircle className="w-4 h-4 fill-white/20 shrink-0" />
        <span>ЮАНЬ САТЫП АЛУУ (WhatsApp)</span>
      </a>
    </div>
  );
};
