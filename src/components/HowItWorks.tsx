import React from 'react';
import { Calculator, Eye, MousePointerClick, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface HowItWorksProps {
  onScrollToCalculator: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onScrollToCalculator }) => {
  const steps = [
    {
      num: '01',
      title: 'Керектүү юань суммасын киргизесиз',
      desc: 'Калькуляторго канча юань (CNY) керек экенин жазыңыз же даяр баскычтарды тандаңыз.',
      icon: Calculator,
    },
    {
      num: '02',
      title: 'Сомдогу сумманы көрөсүз',
      desc: 'Сайт актуалдуу курс боюнча сом менен канча төлөнөрүн так эсептеп берет. Жашыруун пайыз жок.',
      icon: Eye,
    },
    {
      num: '03',
      title: '«Юань сатып алуу» кнопкасын басасыз',
      desc: 'Бир эле басуу менен тандалган сумма WhatsApp билдирүүсүнө даярдалат.',
      icon: MousePointerClick,
    },
    {
      num: '04',
      title: 'WhatsApp аркылуу заказды ырастайбыз',
      desc: 'Биз сизге ыңгайлуу банктык реквизиттерди беребиз (МБанк, Оптима, Бакай, Элсом ж.б.).',
      icon: MessageSquare,
    },
    {
      num: '05',
      title: 'Төлөм жүргүзүлүп, юань эсебиңизге түшөт',
      desc: 'Төлөмдөн кийин 5–15 мүнөт ичинде юань сиздин Alipay/WeChat эсебиңизге же сатуучуңузга которулат.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider mb-3">
            <span>Жөнөкөй жана тез</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Кантип юань сатып алса болот?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Бар болгону бир нече жөнөкөй кадам аркылуу каалаган суммадагы юанды коопсуз алыңыз.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-5 border border-slate-200/80 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-red-600 group-hover:border-red-200 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400 group-hover:text-red-600 transition-colors flex items-center gap-1">
                  <span>Кадам {idx + 1}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onScrollToCalculator}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calculator className="w-4 h-4 text-red-500" />
            <span>Калькуляторго өтүп эсептөө</span>
          </button>
        </div>

      </div>
    </section>
  );
};
