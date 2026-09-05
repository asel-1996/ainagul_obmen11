import React from 'react';
import { MessageCircle, Instagram, Phone, Clock, ShieldCheck, ArrowUpRight, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface FinalCtaProps {
  currentRate: number;
  onScrollToCalculator: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ currentRate, onScrollToCalculator }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      
      {/* Big Action Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle background circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-black/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-3xl sm:text-4xl mb-3">🇨🇳</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Юань керекпи? Азыр эсептеп көрүңүз!
            </h2>
            <p className="text-white/90 text-sm sm:text-lg mb-8 leading-relaxed">
              Бүгүнкү эң жагымдуу курс менен юанды 5–15 мүнөттө коопсуз сатып алыңыз. «Мени менен — ВЫГОДНО, УДОБНО И НАДЕЖНО».
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-buy-cny-cta"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-base shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>ЮАНЬ САТЫП АЛУУ</span>
              </a>

              <button
                type="button"
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-red-800/60 hover:bg-red-800 text-white font-bold text-base border border-white/20 transition-colors"
              >
                <span>Калькуляторго өтүү</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1">✓ Жашыруун комиссия жок</span>
              <span className="flex items-center gap-1">✓ Бүгүнкү курс: 1 CNY = {currentRate.toFixed(2)} сом</span>
              <span className="flex items-center gap-1">✓ 100% Кепилдик</span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Details & Contact Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-sm">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                ¥
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                ALIPAY AINAGUL
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-4">
              Кытайдан товар ташыган кардарлар, дүкөн ээлери жана жеке адамдар үчүн юань сатып алуу, сатуу жана сатуучуларга төлөө кызматы.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Ишенимдүү жана расмий тейлөө</span>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Байланыш каналдары
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Тел: {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-rose-500" />
                  <span>Instagram: {SITE_CONFIG.instagramHandle}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-rose-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Иш графиги
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{SITE_CONFIG.workHours.displayString}</span>
              </div>
              <p>Дүйшөмбү — Жекшемби (дем алышсыз)</p>
              <p className="text-[11px] text-slate-400 pt-1">
                Иш убактысынан тышкары WhatsApp’ка калтырылган билдирүүлөр эртең менен биринчи кезекте каралат.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ALIPAY AINAGUL. Бардык укуктар корголгон.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ВЫГОДНО, УДОБНО И НАДЕЖНО</span>
            <span>•</span>
            <span>Кыргызстан, Бишкек</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
