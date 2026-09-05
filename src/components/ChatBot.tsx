import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Clock, Phone, ArrowUpRight, CheckCheck, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { getBishkekTimeStatus, BishkekTimeStatus } from '../utils/timeUtils';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface ChatBotProps {
  currentRate: number;
  onScrollToCalculator: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionButtons?: {
    label: string;
    onClick: () => void;
    isExternal?: boolean;
    href?: string;
  }[];
}

export const ChatBot: React.FC<ChatBotProps> = ({ currentRate, onScrollToCalculator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [timeStatus, setTimeStatus] = useState<BishkekTimeStatus>(getBishkekTimeStatus());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStatus(getBishkekTimeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Саламатсызбы! 👋\nЮань сатып алуу боюнча сизге жардам берүүгө даярмын.\nКандай жардам керек?`,
      time: timeStatus.currentTimeString,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  // Bot response generator based on action or user message
  const handleActionClick = (actionType: 'buy' | 'rate' | 'hours' | 'manager') => {
    const nowStatus = getBishkekTimeStatus();
    setTimeStatus(nowStatus);

    if (actionType === 'buy') {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: '💴 Юань сатып алуу',
        time: nowStatus.currentTimeString,
      };

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Юань сатып алуу өтө жөнөкөй! Калькулятордон керектүү сумманы эсептеп, WhatsApp аркылуу бизге жазыңыз.\n\nБүгүнкү курс: 1 CNY = ${currentRate.toFixed(2)} сом.\nТөлөмдөн кийин 5–15 мүнөттө сиздин Alipay/WeChat эсебиңизге түшөт же сатуучуңузга түз төлөп беребиз.`,
        time: nowStatus.currentTimeString,
        actionButtons: [
          {
            label: 'Калькуляторду ачуу',
            onClick: () => {
              setIsOpen(false);
              onScrollToCalculator();
            },
          },
          {
            label: 'WhatsApp’тан заказ берүү',
            onClick: () => {},
            isExternal: true,
            href: createWhatsAppUrl('Саламатсызбы! Юань сатып алуу боюнча заказ берейин дедим эле.'),
          },
        ],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    } else if (actionType === 'rate') {
      const sample10k = (10000 * currentRate).toLocaleString('ru-RU');
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: '💱 Курс кандай?',
        time: nowStatus.currentTimeString,
      };

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Бүгүнкү расмий курс:\n💴 1 CNY = ${currentRate.toFixed(2)} сом\n\nМисалы:\n• 1 000 CNY = ${(1000 * currentRate).toLocaleString('ru-RU')} сом\n• 5 000 CNY = ${(5000 * currentRate).toLocaleString('ru-RU')} сом\n• 10 000 CNY = ${sample10k} сом\n\nЭч кандай жашыруун комиссия жок! Сумма канчалык чоң болсо, курстан жеңилдик берилет.`,
        time: nowStatus.currentTimeString,
        actionButtons: [
          {
            label: 'Ушул курс менен юань алуу',
            onClick: () => {},
            isExternal: true,
            href: createWhatsAppUrl(`Саламатсызбы! 1 CNY = ${currentRate.toFixed(2)} сом курсу менен юань сатып алгым келет.`),
          },
        ],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    } else if (actionType === 'hours') {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: '🕐 Иш убактысы',
        time: nowStatus.currentTimeString,
      };

      const statusNote = nowStatus.isOpen
        ? '✅ Азыр иш убактысындабыз. Менеджер онлайн жана заказыңызды кабыл алууга даяр!'
        : '⚠️ Азыр иш убактысынан тышкары. Иш убактыбыз: 08:00–22:00 (Бишкек убактысы). Бирок WhatsApp’ка жазып койсоңуз, эртең эртең менен дароо биринчи кезекте жазабыз!';

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `🕐 Иш графигибиз (Бишкек убактысы боюнча):\n08:00 — 22:00 (Дем алышсыз)\n\nУчурдагы Бишкек убактысы: ${nowStatus.currentTimeString}\n\n${statusNote}`,
        time: nowStatus.currentTimeString,
        actionButtons: [
          {
            label: 'WhatsApp аркылуу жазуу',
            onClick: () => {},
            isExternal: true,
            href: createWhatsAppUrl(),
          },
        ],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    } else if (actionType === 'manager') {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: '📲 Менеджер менен байланышуу',
        time: nowStatus.currentTimeString,
      };

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Менеджер менен түздөн-түз байланышуу үчүн төмөнкү номерге WhatsApp аркылуу жазыңыз же чалыңыз:\n\n📞 +996 501 595 471 (Айнагүл)\n📸 Instagram: @alipay.ainagul\n\nБардык суроолоруңузга кубануу менен жооп беребиз!`,
        time: nowStatus.currentTimeString,
        actionButtons: [
          {
            label: 'Түз WhatsApp’ка өтүү',
            onClick: () => {},
            isExternal: true,
            href: createWhatsAppUrl('Саламатсызбы Айнагүл! Менеджер менен түз сүйлөшөйүн дедим эле.'),
          },
        ],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');

    const nowStatus = getBishkekTimeStatus();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: nowStatus.currentTimeString,
    };

    // Smart query parsing in Kyrgyz / Russian
    let botReplyText = '';
    const lower = userText.toLowerCase();

    if (lower.includes('курс') || lower.includes('баа') || lower.includes('канчадан')) {
      botReplyText = `Бүгүнкү курс: 1 CNY = ${currentRate.toFixed(2)} сом. Тагыраак эсептөө үчүн Калькулятор бөлүмүн колдонуңуз же WhatsApp’тан жазыңыз.`;
    } else if (lower.includes('убакыт') || lower.includes('график') || lower.includes('саат')) {
      botReplyText = nowStatus.isOpen
        ? `Азыр иш убактысындабыз! Иш графигибиз: 08:00 — 22:00 (Бишкек убактысы). Сизге азыр жардам бере алабыз.`
        : `Азыр иш убактысынан тышкары. Иш убактыбыз: 08:00–22:00 (Бишкек убактысы). Бирок WhatsApp’ка жазып койсоңуз, эртең 08:00дө дароо жооп беребиз!`;
    } else if (lower.includes('1688') || lower.includes('taobao') || lower.includes('товар') || lower.includes('сатуучу')) {
      botReplyText = `Ооба! 1688 жана Taobao сатуучуларыңызга юань менен түздөн-түз төлөп беребиз. QR-код же Friend Pay шилтемесин WhatsApp аркылуу жөнөтсөңүз болот.`;
    } else if (lower.includes('минимал') || lower.includes('аз')) {
      botReplyText = `Минималдуу сумма 200 CNY башталат. Чакан сыноо заказдарды да кубануу менен кабыл алабыз!`;
    } else {
      botReplyText = `Рахмат сурооңузга! Сизге тезирээк жана так жардам берүү үчүн WhatsApp аркылуу түз байланышууну сунуштайбыз. Биздин номер: +996 501 595 471.`;
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: botReplyText,
      time: nowStatus.currentTimeString,
      actionButtons: [
        {
          label: 'WhatsApp аркылуу жазуу',
          onClick: () => {},
          isExternal: true,
          href: createWhatsAppUrl(`Саламатсызбы! Суроом бар эле: "${userText}"`),
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : handleOpenChat())}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
          aria-label="Чат-ботту ачуу"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white/20" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-bold text-white items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-24 right-3 sm:right-6 z-50 w-[92vw] sm:w-96 max-w-sm h-[520px] bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-bold text-white shadow-md">
                  ¥
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 ${timeStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Айнагүл — Онлайн Жардамчы</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {timeStatus.isOpen ? '🟢 Азыр онлайн (08:00 - 22:00)' : '🟠 Иш убактысынан тышкары'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bishkek status sub-banner */}
          <div className={`px-4 py-2 text-[11px] border-b flex items-center justify-between ${timeStatus.isOpen ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300' : 'bg-amber-950/40 border-amber-800/40 text-amber-300'}`}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{timeStatus.statusText}</span>
            </span>
            <span className="font-mono">{timeStatus.currentTimeString} (БШК)</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/70 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional action buttons inside message */}
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1.5 w-full max-w-[85%]">
                    {msg.actionButtons.map((btn, idx) => (
                      btn.isExternal ? (
                        <a
                          key={idx}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
                        >
                          <span>{btn.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          key={idx}
                          type="button"
                          onClick={btn.onClick}
                          className="text-left px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition-colors"
                        >
                          {btn.label}
                        </button>
                      )
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 4 Core Prompt Action Buttons */}
          <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleActionClick('buy')}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-left transition-colors truncate"
            >
              💴 Юань сатып алуу
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('rate')}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-left transition-colors truncate"
            >
              💱 Курс кандай?
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('hours')}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-left transition-colors truncate"
            >
              🕐 Иш убактысы
            </button>
            <button
              type="button"
              onClick={() => handleActionClick('manager')}
              className="px-2.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-900/50 text-xs font-semibold text-left transition-colors truncate"
            >
              📲 Менеджер менен
            </button>
          </div>

          {/* Text Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Сурооңузду жазыңыз..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
