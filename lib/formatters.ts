import { CURRENCY } from '@/lib/constants/currency'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString(CURRENCY.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString(CURRENCY.locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
}