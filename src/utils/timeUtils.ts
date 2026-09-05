import { SITE_CONFIG } from '../config/siteConfig';

export interface BishkekTimeStatus {
  isOpen: boolean;
  currentTimeString: string;
  statusText: string;
  subText: string;
  hoursLeftToday?: number;
}

/**
 * Calculates current time in Bishkek (UTC+6) and checks if it falls within working hours (08:00 - 22:00).
 */
export function getBishkekTimeStatus(): BishkekTimeStatus {
  const now = new Date();
  // UTC time in ms
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  // Bishkek is UTC+6
  const bishkekDate = new Date(utcMs + SITE_CONFIG.workHours.timezoneOffset * 3600000);

  const hours = bishkekDate.getHours();
  const minutes = bishkekDate.getMinutes();

  const currentTimeMinutes = hours * 60 + minutes;
  const openTimeMinutes = SITE_CONFIG.workHours.openHour * 60 + SITE_CONFIG.workHours.openMinute;
  const closeTimeMinutes = SITE_CONFIG.workHours.closeHour * 60 + SITE_CONFIG.workHours.closeMinute;

  const isOpen = currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const currentTimeString = `${hh}:${mm}`;

  if (isOpen) {
    const minutesLeft = closeTimeMinutes - currentTimeMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    return {
      isOpen: true,
      currentTimeString,
      statusText: 'Азыр иш убактысындабыз',
      subText: `Менеджер онлайн. Бүгүн 22:00гө чейин ачыкпыз (Бишкек: ${currentTimeString})`,
      hoursLeftToday: hoursLeft,
    };
  } else {
    return {
      isOpen: false,
      currentTimeString,
      statusText: 'Азыр иш убактысынан тышкары',
      subText: `Иш убактыбыз: ${SITE_CONFIG.workHours.displayString}. WhatsApp’ка жазып койсоңуз, эртең менен 08:00дө дароо жооп беребиз!`,
    };
  }
}
