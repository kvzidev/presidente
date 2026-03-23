import type { Locale } from '../i18n/ui';
import * as es from './locales/es-AR';
import * as en from './locales/en';
import { team as esTeam } from './locales/team.es-AR';
import { team as enTeam } from './locales/team.en';

export interface Proposal {
  text: string;
  description: string;
}

export interface Area {
  key: string;
  label: string;
  icon: string;
  proposals: Proposal[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

/** Language-agnostic configuration for areas. */
const AREA_CONFIG: Record<string, { icon: string }> = {
  tech:   { icon: '⬡' },
  edu:    { icon: '◈' },
  health: { icon: '◎' },
  state:  { icon: '▣' },
};

const LOCALES = { 
  'es-AR': es, 
  'en': en 
} as const;

const TEAM_LOCALES = {
  'es-AR': esTeam,
  'en': enTeam
} as const;

/** 
 * Merges localized content with structural configuration.
 * Adding a new category only requires adding it to the locale files
 * and (optionally) updating the icon registry.
 */
export const getAreas = (lang: Locale): Area[] => {
  const content = (LOCALES[lang] ?? LOCALES['es-AR']) as Record<string, { label: string; proposals: Proposal[] }>;
  
  return Object.entries(content).map(([key, data]) => ({
    key,
    label: data.label,
    icon: AREA_CONFIG[key]?.icon ?? '•',
    proposals: data.proposals,
  }));
};

/** Retrieves the localized team members. */
export const getTeam = (lang: Locale): TeamMember[] => {
  return TEAM_LOCALES[lang] ?? TEAM_LOCALES['es-AR'];
}
