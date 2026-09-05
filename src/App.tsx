import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { WhyUs } from './components/WhyUs';
import { ChinaGoods } from './components/ChinaGoods';
import { HowItWorks } from './components/HowItWorks';
import { Reviews } from './components/Reviews';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { ChatBot } from './components/ChatBot';
import { StickyMobileBar } from './components/StickyMobileBar';
import { SITE_CONFIG } from './config/siteConfig';

export default function App() {
  const [currentRate, setCurrentRate] = useState<number>(() => {
    const saved = localStorage.getItem('ainagul_cny_rate');
    if (saved) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return SITE_CONFIG.cnyToKgsRate;
  });

  const handleUpdateRate = (newRate: number) => {
    setCurrentRate(newRate);
    localStorage.setItem('ainagul_cny_rate', newRate.toString());
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentRate={currentRate}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Башкы экран */}
        <Hero
          currentRate={currentRate}
          onScrollToCalculator={scrollToCalculator}
        />

        {/* 2. Юань калькулятору */}
        <Calculator
          currentRate={currentRate}
          onUpdateRate={handleUpdateRate}
        />

        {/* 3. Эмне үчүн биз? */}
        <WhyUs />

        {/* 4. Кытайдан товар аласызбы? (1688 / Taobao / Pinduoduo) */}
        <ChinaGoods
          onScrollToCalculator={scrollToCalculator}
        />

        {/* 5. Кантип сатып аласыз? (Кадамдар) */}
        <HowItWorks
          onScrollToCalculator={scrollToCalculator}
        />

        {/* 6. Кардарлардын пикирлери */}
        <Reviews />

        {/* 7. Көп берилүүчү суроолор (FAQ) */}
        <Faq />
      </main>

      {/* 8. Акыркы CTA жана Footer */}
      <FinalCta
        currentRate={currentRate}
        onScrollToCalculator={scrollToCalculator}
      />

      {/* Floating Interactive Chat-Bot */}
      <ChatBot
        currentRate={currentRate}
        onScrollToCalculator={scrollToCalculator}
      />

      {/* Mobile Sticky Bar for quick 1-tap WhatsApp action */}
      <StickyMobileBar
        currentRate={currentRate}
      />
    </div>
  );
}
