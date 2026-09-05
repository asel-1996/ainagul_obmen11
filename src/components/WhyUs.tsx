import React from 'react';
import { CheckCircle2, Zap, TrendingUp, ShieldCheck, MessageCircle, HeartHandshake } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const WhyUs: React.FC = () => {
  const features = [
    {
      title: 'Ыңгайлуу заказ берүү',
      desc: 'Татаал каттоо жана ашыкча документтер жок. Сумманы тандап, 2 эле басуу менен юань сатып алууга заказ бересиз.',
      icon: CheckCircle2,
      badge: 'Жөнөкөй процесс',
    },
    {
      title: 'Тез байланыш',
      desc: 'Заказыңыз келери менен 2-5 мүнөт ичинде жооп берип, төлөмдү ырастайбыз. Убактыңызды баалайбыз.',
      icon: Zap,
      badge: '5–10 мүнөттө',
    },
    {
      title: 'Актуалдуу курс',
      desc: 'Ар дайым Кытайдын расмий базар курсуна ылайыкталган эң пайдалуу баа. Эч кандай жашыруун комиссия же кошумча пайыз кошулбайт.',
      icon: TrendingUp,
      badge: 'Чынчыл баа',
    },
    {
      title: 'Ишенимдүү тейлөө',
      desc: '100% коопсуздук кепилдиги. Юандар түздөн-түз сиздин Alipay, WeChat эсебиңизге же Кытайдагы сатуучуңузга түшөт.',
      icon: ShieldCheck,
      badge: '100% Кепилдик',
    },
    {
      title: 'WhatsApp аркылуу түз байланыш',
      desc: 'Ар бир кардарга жекече мамиле. Менеджер менен түз байланышып, каалаган сурооңузга толук жооп ала аласыз.',
      icon: MessageCircle,
      badge: '+996 501 595 471',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-16">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-red-400 mb-3 uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Ишенимдүү өнөктөш</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Эмне үчүн бизди тандашат?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Кытай менен соода кылган кардарлар үчүн юань алмаштыруудагы эң ишенимдүү, коопсуз жана туруктуу көпүрө.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700/80 hover:border-red-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors flex items-center gap-2">
                    <span>✓</span>
                    <span>{item.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center text-xs font-semibold text-emerald-400">
                  <span>Текшерилген жана кепилденген</span>
                </div>
              </div>
            );
          })}

          {/* Highlight Card for Trust */}
          <div className="bg-gradient-to-br from-red-900/40 via-slate-800 to-slate-900 rounded-2xl p-6 border border-red-500/40 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                Биздин башкы ураан
              </div>
              <h3 className="text-xl font-black text-white leading-tight mb-3">
                «Мени менен — ВЫГОДНО, УДОБНО И НАДЕЖНО»
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Сиз товар тандоого жана бизнесиңизге гана көңүл буруңуз, акча которуу жана төлөм маселесин биз толук өз мойнубузга алабыз!
              </p>
            </div>

            <div className="mt-6">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-md shadow-red-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Менеджерге суроо берүү</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
