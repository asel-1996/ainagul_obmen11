import React, { useState, useMemo } from 'react';
import { Calculator as CalcIcon, ArrowRightLeft, MessageCircle, Sparkles, RefreshCw, Settings2, Check, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { createOrderWhatsAppUrl } from '../utils/whatsapp';

interface CalculatorProps {
  currentRate: number;
  onUpdateRate: (newRate: number) => void;
}

const PRESET_AMOUNTS = [1000, 3000, 5000, 10000, 20000, 50000, 100000];

export const Calculator: React.FC<CalculatorProps> = ({ currentRate, onUpdateRate }) => {
  const [cnyInput, setCnyInput] = useState<string>('10000');
  const [isReverseMode, setIsReverseMode] = useState<boolean>(false);
  const [somInput, setSomInput] = useState<string>('124500');
  const [showAdminRateModal, setShowAdminRateModal] = useState<boolean>(false);
  const [customRateInput, setCustomRateInput] = useState<string>(currentRate.toString());
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Parsed numbers
  const cnyValue = useMemo(() => {
    if (isReverseMode) {
      const som = parseFloat(somInput.replace(/\s+/g, '')) || 0;
      return currentRate > 0 ? Math.round(som / currentRate) : 0;
    } else {
      return parseFloat(cnyInput.replace(/\s+/g, '')) || 0;
    }
  }, [cnyInput, somInput, isReverseMode, currentRate]);

  const somValue = useMemo(() => {
    if (isReverseMode) {
      return parseFloat(somInput.replace(/\s+/g, '')) || 0;
    } else {
      return Math.round(cnyValue * currentRate);
    }
  }, [cnyValue, somInput, isReverseMode, currentRate]);

  const handleCnyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    setCnyInput(raw);
  };

  const handleSomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    setSomInput(raw);
  };

  const selectPreset = (amount: number) => {
    if (isReverseMode) {
      setIsReverseMode(false);
    }
    setCnyInput(amount.toString());
  };

  const handleSaveCustomRate = () => {
    const num = parseFloat(customRateInput.replace(',', '.'));
    if (!isNaN(num) && num > 0) {
      onUpdateRate(num);
      setShowAdminRateModal(false);
    }
  };

  const handleResetDefaultRate = () => {
    onUpdateRate(SITE_CONFIG.cnyToKgsRate);
    setCustomRateInput(SITE_CONFIG.cnyToKgsRate.toString());
    setShowAdminRateModal(false);
  };

  const orderWhatsAppUrl = useMemo(() => {
    return createOrderWhatsAppUrl(cnyValue, somValue, currentRate);
  }, [cnyValue, somValue, currentRate]);

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs uppercase tracking-wider mb-3 border border-red-100">
            <CalcIcon className="w-3.5 h-3.5 text-red-600" />
            <span>Интерактивдүү эсептөө</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Юань калькулятору
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Керектүү сумманы киргизип, бүгүнкү курс менен так баасын дароо билиңиз. Эч кандай жашыруун комиссия жок!
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Rate Badge and Rate Modifier button */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Колдонулуп жаткан курс:</span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-xs font-semibold text-slate-300">1 CNY =</span>
                <span className="text-sm font-black text-emerald-400 font-mono">{currentRate.toFixed(2)}</span>
                <span className="text-xs font-semibold text-slate-300">сом</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCustomRateInput(currentRate.toString());
                  setShowAdminRateModal(true);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-800"
                title="Курсту сайттан же файлдан оңой өзгөртүү"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Курсту өзгөртүү</span>
              </button>
            </div>
          </div>

          {/* Preset Quick Chips */}
          <div className="relative z-10 mt-6">
            <div className="text-xs font-medium text-slate-400 mb-2.5">
              Көп тандалган суммалар:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((amt) => {
                const isActive = !isReverseMode && cnyValue === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => selectPreset(amt)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {amt.toLocaleString('ru-RU')} ¥
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Input Fields */}
          <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
            
            {/* Input 1: Yuan or Som */}
            <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/80 focus-within:border-red-500 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="cny-input" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isReverseMode ? 'Сизде бар сумма (Сом)' : 'Канча юань керек? (CNY)'}
                </label>
                <span className="text-xs font-bold text-red-400">
                  {isReverseMode ? 'KGS' : 'CNY (¥)'}
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  id="cny-input"
                  type="text"
                  inputMode="numeric"
                  value={isReverseMode ? somInput : cnyInput}
                  onChange={isReverseMode ? handleSomChange : handleCnyChange}
                  placeholder="0"
                  className="w-full bg-transparent text-2xl sm:text-3xl font-black text-white focus:outline-none tracking-tight font-mono"
                />
                <span className="text-xl sm:text-2xl font-bold text-slate-500 ml-2">
                  {isReverseMode ? 'сом' : '¥'}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                {isReverseMode ? 'Сом суммасын жазыңыз' : 'Каалаган сумманы жазсаңыз болот (мин. 200 ¥)'}
              </p>
            </div>

            {/* Reverse switch button (Mobile centered, desktop inline) */}
            <div className="md:hidden flex justify-center -my-2 z-20">
              <button
                type="button"
                onClick={() => setIsReverseMode(!isReverseMode)}
                className="p-2.5 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-500 transition-all active:scale-95"
                title="Багытты которуу"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Input 2: Calculated Result */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl p-5 border border-emerald-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isReverseMode ? 'Сиз ала турган юань суммасы' : 'Сиз төлөй турган сумма (Сом)'}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {isReverseMode ? 'CNY (¥)' : 'KGS'}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                  {isReverseMode
                    ? cnyValue.toLocaleString('ru-RU')
                    : somValue.toLocaleString('ru-RU')}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-300">
                  {isReverseMode ? '¥ (юань)' : 'сом'}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Комиссия: 0 сом (акысыз)</span>
                <span className="text-slate-500">•</span>
                <span>Тез которуу: 5–10 мүнөт</span>
              </div>
            </div>
          </div>

          {/* Breakdown summary row */}
          <div className="relative z-10 mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Төлөм үчүн кабыл алынат:</span>
              <span className="font-semibold text-white">MBank • Optima • Bakai • Demir • O!Dengi • Накталай</span>
            </div>
            <button
              type="button"
              onClick={() => setIsReverseMode(!isReverseMode)}
              className="hidden md:flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{isReverseMode ? 'Юандан сомго эсептөө' : 'Сомдон юанга эсептөө'}</span>
            </button>
          </div>

          {/* Main CTA Button: «Ушул суммага юань сатып алуу» */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="calc-buy-button"
              className="w-full flex-1 flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-red-600/30 hover:shadow-red-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] text-center"
            >
              <MessageCircle className="w-6 h-6 fill-white/20 shrink-0" />
              <span>УШУЛ СУММАГА ЮАНЬ САТЫП АЛУУ</span>
            </a>
          </div>

          <p className="relative z-10 text-center text-xs text-slate-400 mt-3.5">
            Баскычты басканда түздөн-түз WhatsApp ачылып, тандалган сумма автоматтык түрдө жазылат.
          </p>

        </div>

        {/* Modal: Rate modifier for site owner */}
        {showAdminRateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-lg text-white">Курсту өзгөртүү</h3>
                </div>
                <button
                  onClick={() => setShowAdminRateModal(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Сиз курсту бул жерден убактылуу өзгөртүп текшере аласыз же туруктуу өзгөртүү үчүн 
                <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-800 text-red-400 font-mono text-xs">src/config/siteConfig.ts</code> 
                файлындагы <span className="font-semibold text-white">cnyToKgsRate</span> санын алмаштырсаңыз болот.
              </p>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Жаңы курс (1 CNY канча сом болот):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={customRateInput}
                    onChange={(e) => setCustomRateInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-red-500"
                  />
                  <span className="font-bold text-slate-400">сом</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveCustomRate}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors"
                >
                  Сактоо жана колдонуу
                </button>
                <button
                  type="button"
                  onClick={handleResetDefaultRate}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                >
                  Баштапкы курс
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
