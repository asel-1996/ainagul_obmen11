import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageCircle, Instagram, Clock, Phone, TrendingUp, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { getBishkekTimeStatus, BishkekTimeStatus } from '../utils/timeUtils';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  currentRate: number;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRate, onOpenCalculator }) => {
  const [timeStatus, setTimeStatus] = useState<BishkekTimeStatus>(getBishkekTimeStatus());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStatus(getBishkekTimeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-md">
      {/* Top micro-bar: Work hours & Bishkek status */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${timeStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="font-medium text-slate-200">
              {timeStatus.isOpen ? 'Азыр ачыкпыз' : 'Иш убактысынан тышкары'}
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Иш графиги: {SITE_CONFIG.workHours.displayString}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium ml-auto">
            <a 
              href={SITE_CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              title="Instagram @alipay.ainagul"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">{SITE_CONFIG.instagramHandle}</span>
            </a>
            <a 
              href={createWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-rose-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <span>¥</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-red-400 transition-colors">
                ALIPAY AINAGUL
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Юань Сатуу & Которуу Кызматы
            </span>
          </div>
        </a>

        {/* Live Rate Pill in Header */}
        <div 
          onClick={onOpenCalculator}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-red-500/50 cursor-pointer transition-all shadow-inner group"
          title="Калькуляторду ачуу"
        >
          <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 font-semibold text-xs">
            <TrendingUp className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Бүгүнкү курс:</span>
            <span className="font-bold text-white text-sm text-emerald-400 tracking-tight">
              1 CNY = {currentRate.toFixed(2)} сом
            </span>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-300 font-semibold px-2 py-0.5 rounded-full">
            Түз баа
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#calculator" className="hover:text-white transition-colors">Калькулятор</a>
          <a href="#china-goods" className="hover:text-white transition-colors">1688 / Taobao</a>
          <a href="#why-us" className="hover:text-white transition-colors">Эмне үчүн биз?</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Кантип сатып алат?</a>
          <a href="#reviews" className="hover:text-white transition-colors">Пикирлер</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={createWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            id="header-whatsapp-cta"
            className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 hover:shadow-red-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>ЮАНЬ САТЫП АЛУУ</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Менюну ачуу"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-300">Бүгүнкү курс:</span>
            <span className="font-bold text-emerald-400 text-sm">1 CNY = {currentRate.toFixed(2)} сом</span>
          </div>
          <div className="flex flex-col gap-2 pt-1 text-sm font-medium">
            <a 
              href="#calculator" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              📊 Юань калькулятору
            </a>
            <a 
              href="#china-goods" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              🇨🇳 1688 / Taobao / Pinduoduo
            </a>
            <a 
              href="#why-us" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              ⭐ Эмне үчүн биз?
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              📝 Кантип сатып алуу керек?
            </a>
            <a 
              href="#reviews" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              💬 Кардарлардын пикирлери
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
            >
              ❓ Көп берилүүчү суроолор
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <a 
              href={SITE_CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-slate-200 font-medium text-xs hover:bg-slate-700"
            >
              <Instagram className="w-4 h-4 text-rose-500" />
              Instagram
            </a>
            <a 
              href={createWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-500"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
