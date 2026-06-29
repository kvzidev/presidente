const candidate_first = 'Ron';
const candidate_last = 'a Fondo';
const year = '2027';

export default {
  /* Nav */
  'nav.proposals': 'Proposals',
  'nav.vision': 'Argentina 2035',
  'nav.blog': 'Making history',
  'nav.team': 'Team',
  'nav.contact': 'Contact',
  'nav.lang_switch': 'Español',
  'nav.lang_label': 'Cambiar a Español',
  'nav.open_menu': 'Open menu',
  'nav.close_menu': 'Close menu',
  'nav.skip': 'Skip to main content',

  /* Hero */
  'hero.year': year,
  'hero.badge': `Elections ${year}`,
  'hero.portrait_alt': `${candidate_first} ${candidate_last}, presidential candidate ${year}`,
  'hero.name': `${candidate_first} ${candidate_last}`,
  'hero.first_name': candidate_first,
  'hero.last_name': candidate_last,
  'hero.role': `Presidential Candidate ${year}`,
  'hero.slogan': 'A system that works.',
  'hero.subtitle': 'Engineering applied to public policy. No dogma, just methodology.',
  'hero.cta_proposals': 'See proposals',
  'hero.cta_vision': 'Argentina 2035',
  'hero.cta_newsletter': 'Argentina, together',
  'hero.cta_contact': 'Get in touch',

  /* Index nav cards */
  'cards.proposals.title': 'Proposals',
  'cards.proposals.desc': 'Five areas, concrete goals, realistic timelines.',
  'cards.vision.title': 'Argentina 2035',
  'cards.vision.desc': 'An eight-year horizon with verifiable milestones.',

  /* Proposals page */
  'proposals.title': 'Proposals',
  'proposals.lead': 'Five areas, concrete goals, realistic timelines.',
  'proposals.pdf': 'Download full proposals (in progress)',

  /* Argentina 2035 page */
  'vision.title': 'Argentina 2035',
  'vision.lead': "It's not a slogan. It's a plan with dates.",
  'vision.chapter': 'Phase',

  /* Team page */
  'team.title': 'The Team',
  'team.lead': 'Meet the people driving this transformation project.',

  /* Contact modal */
  'contact.open': 'Contact',
  'contact.title': 'Contact',
  'contact.lead': 'Suggestions, questions, or just to talk.',
  'contact.name.label': 'Full name',
  'contact.email.label': 'Email address',
  'contact.msg.label': 'Message',
  'contact.submit': 'Send',
  'contact.sending': 'Sending...',
  'contact.success': 'Message received! Thank you.',
  'contact.error': 'Something went wrong. Please try again.',
  'contact.close': 'Close',
  'contact.required': 'This field is required.',
  'contact.email_invalid': 'Please enter a valid email address.',

  /* Blog page (Haciendo historia) */
  'blog.title': 'Stories',
  'blog.lead': 'Exploring success stories and challenges in the application of methodology.',
  'blog.more': 'View more stories',
  'blog.back': '← Back to stories',

  /* Footer */
  'footer.disclaimer': 'Informational site. Not electoral propaganda. I am not a real candidate.',
  'footer.rights': 'All rights reserved.',
  'footer.lang': 'Español',
  'footer.lang_label': 'Cambiar a Español',
} as const;
