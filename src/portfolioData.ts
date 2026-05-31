export type ProjectAction = 'external' | 'client-library' | 'social-library' | 'concept'

export const capabilities = [
  {
    title: 'Apps',
    description: 'Mobile and web apps with clean UI, smart flows and real business use.',
  },
  {
    title: 'Websites',
    description: 'Premium landing pages and websites designed to look modern and convert.',
  },
  {
    title: 'Social Media Content',
    description: 'Content systems for Reels, TikTok, posts, stories and personal brands.',
  },
  {
    title: 'AI Automation',
    description: 'Smart workflows that save time, automate tasks and connect tools.',
  },
  {
    title: 'Modeling',
    description: 'Personal-brand visuals, shoots and modeling content with a premium look.',
  },
  {
    title: 'Business Systems',
    description: 'Digital systems for leads, clients, workflows, dashboards and growth.',
  },
]

export const services = [
  'Website design',
  'App concepts',
  'Social media content',
  'Branding',
  'Automation systems',
]

export const projects = [
  {
    name: 'FuelRadar',
    description: 'A smart fuel-price discovery app built to help drivers find better prices, save money and make faster everyday decisions.',
    status: 'In development',
    action: 'external' as ProjectAction,
    href: 'https://www.fuel-radar.online/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleASI5y9leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadzBhQqHDFoFXDyTPcko92AMUlp-KoGWUwSVRimdWrTA5fvAffKta68A0j8-Q_aem_YC9xxXwc6q03MVkIDxzkYQ',
    cta: 'View project',
  },
  {
    name: 'EntrepreneurAI',
    description: 'An AI-powered entrepreneurship concept that helps young people turn ideas into clear business action.',
    status: 'Concept',
    action: 'concept' as ProjectAction,
    cta: 'View concept',
  },
  {
    name: 'CreatorWerk',
    description: 'A creator and personal-brand platform focused on content, community, shootings, events and digital presence.',
    status: 'Platform',
    action: 'external' as ProjectAction,
    href: 'https://www.fuel-radar.online/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleASI5y9leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadzBhQqHDFoFXDyTPcko92AMUlp-KoGWUwSVRimdWrTA5fvAffKta68A0j8-Q_aem_YC9xxXwc6q03MVkIDxzkYQ',
    cta: 'View project',
  },
  {
    name: 'Client Websites',
    description: 'Premium websites and landing pages built for real clients, brands and event businesses.',
    status: 'Library',
    action: 'client-library' as ProjectAction,
    cta: 'Open library',
  },
  {
    name: 'Social Media Projects',
    description: 'Personal content systems for Instagram, TikTok and Facebook, built around reach, consistency and personal branding.',
    status: 'Active',
    action: 'social-library' as ProjectAction,
    cta: 'View accounts',
  },
]

export const clientWebsites = [
  {
    title: 'Eventmanufaktur Esch',
    description: 'Event business website with clean structure and premium local presence.',
    image: '/images/client-sites/eventmanufaktur.webp',
    href: 'https://www.eventmanufaktur-esch.de/',
  },
  {
    title: 'Höpfi',
    description: 'A client website preview focused on clear brand presentation.',
    image: '/images/client-sites/hoepfi.webp',
    href: 'https://www.xn--hpfi-0ra.de/',
  },
  {
    title: 'Swyone',
    description: 'A modern website preview with strong digital product positioning.',
    image: '/images/client-sites/swyone.webp',
    href: 'https://swyone.com/',
  },
]

export const socialLinks = [
  {
    platform: 'Instagram',
    description: 'Personal brand, lifestyle and creator updates.',
    href: 'https://www.instagram.com/luis_floria_official?igsh=MW8xdnFxeHU0cDZ6bA%3D%3D&utm_source=qr',
  },
  {
    platform: 'TikTok',
    description: 'Short-form content, ideas and growth experiments.',
    href: 'https://www.tiktok.com/@luisfloria_lifestyle?_r=1&_t=ZG-96ojtskcWcz',
  },
  {
    platform: 'Facebook',
    description: 'Community presence and wider project updates.',
    href: 'https://www.facebook.com/share/1E7dcv4JoY/?mibextid=wwXIfr',
  },
]

export const tools = [
  {
    name: 'React',
    icon: 'React',
    description: 'Frontend library for building modern user interfaces.',
  },
  {
    name: 'Next.js',
    icon: 'Next',
    description: 'Framework for fast, scalable web applications.',
  },
  {
    name: 'Supabase',
    icon: 'Supa',
    description: 'Backend, database and authentication.',
  },
  {
    name: 'Expo',
    icon: 'Expo',
    description: 'Mobile app development with React Native.',
  },
  {
    name: 'AI Tools',
    icon: 'AI',
    description: 'Automation, content and workflow acceleration.',
  },
  {
    name: 'Cursor',
    icon: 'Cursor',
    description: 'AI-powered coding environment.',
  },
  {
    name: 'Claude',
    icon: 'Claude',
    description: 'AI assistant for planning, coding and writing.',
  },
  {
    name: 'Lovable',
    icon: 'Love',
    description: 'Fast AI website and app prototyping.',
  },
  {
    name: 'Netlify',
    icon: 'Netlify',
    description: 'Hosting and deployment for modern websites.',
  },
  {
    name: 'GitHub',
    icon: 'GitHub',
    description: 'Code versioning and project collaboration.',
  },
  {
    name: 'Canva',
    icon: 'Canva',
    description: 'Visual content and brand design.',
  },
  {
    name: 'Figma',
    icon: 'Figma',
    description: 'UI/UX design and prototyping.',
  },
]

export const planetTiles = Array.from({ length: 28 }, (_, index) => `/images/planet/tile-${String(index + 1).padStart(2, '0')}.webp`)
