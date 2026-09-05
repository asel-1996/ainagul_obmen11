import React from 'react';
import { Star, MessageCircle, Instagram, CheckCheck, ShieldCheck, ThumbsUp } from 'lucide-react';
import { REVIEWS_DATA } from '../config/siteConfig';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-16">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 mb-3">
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Чыныгы кардарлардын баасы</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Кардарлардын пикирлери
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            WhatsApp жана Instagram аркылуу бизден юань сатып алган кардарлардын чыныгы пикирлери.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all"
            >
              <div>
                {/* Header: Author & Platform Badge */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-700/70">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                      {rev.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm sm:text-base">{rev.author}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" title="Текшерилген бүтүм" />
                      </div>
                      <div className="text-xs text-slate-400">{rev.city}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-medium text-slate-300">
                      {rev.platform === 'WhatsApp' ? (
                        <>
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>WhatsApp</span>
                        </>
                      ) : (
                        <>
                          <Instagram className="w-3 h-3 text-rose-400" />
                          <span>Instagram</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{rev.date}</span>
                  </div>
                </div>

                {/* Amount pill & Stars */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold font-mono">
                    Сумма: {rev.amount}
                  </div>
                </div>

                {/* WhatsApp Chat Style Message Bubble */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 relative">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    «{rev.message}»
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
                    <span>Жеткирилди</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ThumbsUp className="w-3 h-3" /> Сунушталат
                </span>
                <span className="text-[11px]">Юань тез которулган</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave feedback CTA */}
        <div className="mt-12 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 text-center max-w-xl mx-auto">
          <h4 className="text-base font-bold text-white mb-1">
            Сиз да өз пикириңизди калтырыңыз же суроо бериңиз
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Биз ар бир кардардын ишенимин жана убактысын жогору баалайбыз.
          </p>
          <a
            href={createWhatsAppUrl('Саламатсызбы! Мен да юань алып пикир калтырайын дедим эле.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp аркылуу байланышуу</span>
          </a>
        </div>

      </div>
    </section>
  );
};
