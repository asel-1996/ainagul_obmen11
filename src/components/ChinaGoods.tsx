import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, QrCode, CheckCircle2, MessageCircle } from 'lucide-react';
import { createMarketplaceWhatsAppUrl } from '../utils/whatsapp';

interface ChinaGoodsProps {
  onScrollToCalculator: () => void;
}

export const ChinaGoods: React.FC<ChinaGoodsProps> = ({ onScrollToCalculator }) => {
  const marketplaces = [
    { name: '1688.com', desc: 'Дүң заводдук баалардагы товарлар', color: 'border-orange-500/40 text-orange-500 bg-orange-50' },
    { name: 'Taobao', desc: 'Чекене жана сапаттуу буюмдар', color: 'border-amber-500/40 text-amber-600 bg-amber-50' },
    { name: 'Pinduoduo', desc: 'Арзан топтук сатып алуулар', color: 'border-red-500/40 text-red-600 bg-red-50' },
    { name: 'Poizon (Dewu)', desc: 'Оригинал кийим, бут кийимдер', color: 'border-cyan-600/40 text-cyan-700 bg-cyan-50' },
  ];

  return (
    <section id="china-goods" className="py-16 sm:py-24 bg-slate-50 relative scroll-mt-16 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/70 text-red-700 font-bold text-xs uppercase tracking-wider mb-4 border border-red-200">
                <span className="text-base">🇨🇳</span>
                <span>Кытайдан товар ташыгандарга атайын кызмат</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Кытайдан товар аласызбы?
              </h2>

              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                1688, Taobao, Pinduoduo аркылуу товар тандап, төлөм кылууга келгенде тоскоолдук болуп жатабы?
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Өзүңүздүн Alipay капчыгыңызды толуктап беребиз:</strong> Юань 5-10 мүнөттө сиздин эсебиңизге түшөт.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Сатуучуңузга түз төлөп беребиз:</strong> Сатуучунун Alipay QR-коду же 1688 «Курбума төлөтүү» (Friend Pay) шилтемеси аркылуу товардын акчасын дароо жаап беребиз.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Карго жана жеткирүү акысын төлөө:</strong> Кытайдагы карго компанияңыздын эсебине юань которуу.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onScrollToCalculator}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Юань эсептөө</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={createMarketplaceWhatsAppUrl('1688 / Taobao')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Сатуучуга төлөтүү (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Right marketplaces card block */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Колдоого алынган платформалар
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Кепилдик
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {marketplaces.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80">
                    <div className="font-extrabold text-white text-base tracking-tight mb-1">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20 flex items-start gap-3">
                <QrCode className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Alipay QR-код барбы?</strong> 
                  <br />
                  Сатуучуңуздун QR-кодун WhatsApp аркылуу жөнөтүңүз, 5 мүнөттө төлөп чегин кайра салып беребиз!
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
