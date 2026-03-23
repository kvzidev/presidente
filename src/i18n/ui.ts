import es from './locales/es-AR';
import en from './locales/en';

export type Locale = 'es-AR' | 'en';
export const defaultLocale: Locale = 'es-AR';
export const locales: Locale[] = ['es-AR', 'en'];

const ui = {
  'es-AR': es,
  'en': en,
} as const;

type UIKeys = keyof typeof ui['es-AR'];

/** Returns a typed t() function for the given locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKeys): string {
    return (ui[locale] as Record<string, string>)[key] ?? (ui['es-AR'] as Record<string, string>)[key] ?? key;
  };
}
