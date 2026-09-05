import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../config/siteConfig';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 relative scroll-mt-16 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 font-bold text-xs uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Суроолор жана жооптор</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Көп берилүүчү суроолор
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Юань сатып алуу жана төлөм процесстери боюнча эң маанилүү суроолорго жооптор.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-red-50 text-red-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-base">
              Башка сурооңуз барбы?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Менеджерге WhatsApp аркылуу жазыңыз, бардык суроолоруңузга дароо жооп беребиз.
            </p>
          </div>

          <a
            href={createWhatsAppUrl('Саламатсызбы! Мага юань сатып алуу боюнча кеңеш керек эле.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shrink-0 shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp’тан суроо</span>
          </a>
        </div>

      </div>
    </section>
  );
};
