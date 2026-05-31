export type ProjectAction = 'external' | 'client-library' | 'social-library' | 'concept'

export const capabilities = [
  'Apps',
  'Websites',
  'Social Media Content',
  'AI Automation',
  'Modeling',
  'Business Systems',
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
    description: 'A smarter fuel price discovery app concept built for everyday decisions.',
    status: 'In development',
    action: 'external' as ProjectAction,
    href: '#', // TODO: Add final FuelRadar link here.
    cta: 'View project',
  },
  {
    name: 'EntrepreneurAI',
    description: 'AI systems designed to turn business ideas into clear action.',
    status: 'Concept',
    action: 'concept' as ProjectAction,
    cta: 'View concept',
  },
  {
    name: 'Fashfluencer',
    description: 'A fashion and creator platform I help build, focused on personal branding, social media presence and creator growth.',
    status: 'Platform',
    action: 'external' as ProjectAction,
    href: '#', // TODO: Add final Fashfluencer link here.
    cta: 'View project',
  },
  {
    name: 'Client Websites',
    description: 'Premium websites and landing pages built for real clients, brands and events.',
    status: 'Library',
    action: 'client-library' as ProjectAction,
    cta: 'Open library',
  },
  {
    name: 'Social Media Projects',
    description: 'Profiles, short-form systems and platform presence built around brand growth.',
    status: 'Active',
    action: 'social-library' as ProjectAction,
    cta: 'View accounts',
  },
]

export const clientWebsites = [
  {
    title: 'Premium Launch Page',
    description: 'A cinematic landing page for a high-intent product or brand launch.',
    image: '/images/luis-editorial.webp',
    href: '#', // TODO: Add final client website link here.
  },
  {
    title: 'Event Website',
    description: 'A clean event page with strong visuals, details and conversion flow.',
    image: '/images/luis-sunset.webp',
    href: '#', // TODO: Add final client website link here.
  },
  {
    title: 'Brand Portfolio',
    description: 'A dark luxury-tech portfolio layout for a creator or personal brand.',
    image: '/images/planet/tile-03.webp',
    href: '#', // TODO: Add final client website link here.
  },
]

export const socialLinks = [
  {
    platform: 'Instagram',
    description: 'Personal brand, lifestyle and creator updates.',
    href: '#', // TODO: Add final Instagram profile link here.
  },
  {
    platform: 'TikTok',
    description: 'Short-form content, ideas and growth experiments.',
    href: '#', // TODO: Add final TikTok profile link here.
  },
  {
    platform: 'Facebook',
    description: 'Community presence and wider project updates.',
    href: '#', // TODO: Add final Facebook profile link here.
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
