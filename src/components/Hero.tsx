import React from 'react';
import { ShieldCheck, Zap, ArrowRight, MessageCircle, CheckCircle2, Award, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  currentRate: number;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentRate, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glow accent in dark slate */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Mandatory Russian phrase badge prominently placed */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-red-500/30 text-xs sm:text-sm font-semibold text-slate-100 shadow-sm mb-6 hover:border-red-500/60 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Мени менен — <span className="text-red-400 font-extrabold tracking-wide uppercase">ВЫГОДНО, УДОБНО И НАДЕЖНО</span></span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
            <span className="inline-block mr-2">🇨🇳</span>
            ЮАНЬДЫ ТЕЗ ЖАНА ЫҢГАЙЛУУ САТЫП АЛЫҢЫЗ
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
            Кытайдан товар алган кардарлар үчүн юанды ыңгайлуу жана тез сатып алуу мүмкүнчүлүгү.
            Alipay, WeChat капчыктарын толуктоо жана сатуучуларга түздөн-түз төлөм жүргүзүү.
          </p>

          {/* Live Rate Showcase Card */}
          <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl font-bold">
                ¥
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Бүгүнкү расмий курс:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
                  <span className="text-red-400">1 CNY</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-emerald-400 font-mono">{currentRate.toFixed(2)}</span>
                  <span className="text-sm font-bold text-slate-300">сом</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> Жашыруун төлөмсүз
              </span>
              <span className="mt-1 text-[11px] text-slate-400">5-10 мүнөттө которуу</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-12">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-buy-cny-button"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base shadow-lg shadow-red-600/35 hover:shadow-red-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>ЮАНЬ САТЫП АЛУУ</span>
            </a>

            <button
              onClick={onScrollToCalculator}
              id="hero-calculator-button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-base border border-slate-700 transition-colors"
            >
              <span>Калькулятор</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">5–15 мүнөт</div>
                <div className="text-[11px] text-slate-400">Тез которуу</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">100% Ишенимдүү</div>
                <div className="text-[11px] text-slate-400">Коопсуз төлөм</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Эң жакшы курс</div>
                <div className="text-[11px] text-slate-400">Базар баасынан арзан</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">08:00 – 22:00</div>
                <div className="text-[11px] text-slate-400">Үзгүлтүксүз байланыш</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
