import { SITE_CONFIG } from '../config/siteConfig';

/**
 * Creates a standard WhatsApp URL with clean Kyrgyz prefilled text.
 */
export function createWhatsAppUrl(customMessage?: string): string {
  const defaultText = 'Саламатсызбы! Мен юань сатып алуу боюнча заказ бергим келет. Толук маалымат бере аласызбы?';
  const message = customMessage || defaultText;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Creates a WhatsApp URL for a calculated order amount
 */
export function createOrderWhatsAppUrl(cnyAmount: number, kgsAmount: number, rate: number): string {
  const formattedCny = cnyAmount.toLocaleString('ru-RU');
  const formattedKgs = kgsAmount.toLocaleString('ru-RU');
  
  const text = `Саламатсызбы! 👋
Мен юань сатып алуу боюнча заказ берейин дедим:

💴 Юань суммасы: ${formattedCny} CNY
💰 Сомдогу сумма: ${formattedKgs} сом
📊 Курс: 1 CNY = ${rate} сом

Төлөм жүргүзүү үчүн банктык реквизиттерди (МБанк, Оптима же башка) жөнөтүп койсоңуз?`;

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates a WhatsApp URL for Chinese marketplace payments (1688, Taobao, Pinduoduo)
 */
export function createMarketplaceWhatsAppUrl(platform: string = '1688 / Taobao'): string {
  const text = `Саламатсызбы! 👋
Мен ${platform} аркылуу Кытайдан товар алып жаттым эле.
Сатуучума юань менен төлөм кылып берүүгө жардам бере аласызбы?`;

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
