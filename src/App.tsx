import { lazy, Suspense, type FormEvent, type ReactNode, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { capabilities, clientWebsites, projects, services, socialLinks, tools } from './portfolioData'
import './App.css'

const IntroScene = lazy(() => import('./IntroScene'))
const featuredToolNames = ['Notion', 'Claude', 'GitHub', 'Canva', 'Expo']

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ToolLogo({ icon, name }: { icon: string; name: string }) {
  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-label={name}>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92v2.84c0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    )
  }

  if (icon === 'expo') {
    return (
      <svg viewBox="0 0 24 24" aria-label={name}>
        <path fill="currentColor" d="M9.28 6.18c.58-.96 1.02-1.33 1.62-1.33h2.2c.6 0 1.04.37 1.62 1.33l5.85 9.7c.44.74.55 1.28.28 1.72-.25.42-.78.62-1.56.62h-1.36c-.76 0-1.1-.18-1.48-.83l-3.9-6.62c-.24-.4-.86-.4-1.1 0l-3.9 6.62c-.38.65-.72.83-1.48.83H4.71c-.78 0-1.31-.2-1.56-.62-.27-.44-.16-.98.28-1.72l5.85-9.7Z" />
      </svg>
    )
  }

  if (icon === 'canva') {
    return (
      <svg viewBox="0 0 24 24" aria-label={name}>
        <defs>
          <linearGradient id="canva-gradient" x1="2" x2="22" y1="20" y2="4">
            <stop stopColor="#00C4CC" />
            <stop offset="0.55" stopColor="#7D2AE8" />
            <stop offset="1" stopColor="#FF738E" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#canva-gradient)" />
        <path fill="#fff" d="M15.7 14.6c-.7 1.1-1.8 1.8-3.2 1.8-2.2 0-3.7-1.6-3.7-4s1.7-4.8 4.1-4.8c1.2 0 2.1.5 2.6 1.3.3.5.2 1.1-.3 1.3-.5.2-.9.02-1.2-.4-.26-.39-.65-.58-1.17-.58-1.25 0-2.16 1.46-2.16 3.12 0 1.36.76 2.27 1.95 2.27.69 0 1.26-.34 1.7-1.02.28-.43.75-.55 1.18-.31.43.25.48.82.2 1.31Z" />
      </svg>
    )
  }

  if (icon === 'claude') {
    return (
      <svg viewBox="0 0 24 24" aria-label={name}>
        <path fill="currentColor" d="M8.04 4.5h2.6L8.58 19.5h-2.6L8.04 4.5Zm5.28 0h2.57l2.13 15h-2.58l-.39-3.12H10.9l-1.24 3.12H7.08L13.32 4.5Zm1.43 9.65-.64-5.12-2.13 5.12h2.77Z" />
      </svg>
    )
  }

  if (icon === 'notion') {
    return (
      <svg viewBox="0 0 24 24" aria-label={name}>
        <path fill="#fff" d="M5.1 4.3 16.85 3.45c1.44-.12 1.83-.04 2.74.63l.38.29c.62.46.83.58.83 1.07v13.28c0 .86-.32 1.38-1.45 1.45L5.7 20.98c-.86.05-1.27-.08-1.72-.67l-.95-1.23c-.52-.68-.73-1.19-.73-1.79V5.93c0-.7.31-1.13 2.8-1.63Z" />
        <path fill="#050505" d="M6.04 8.27v9.83l11.98-.7V6.8l-1.87.15v7.45L10.4 7.38l-4.36.89Zm4.14.84 4.76 5.82V7.03l1.2-.08v8.88l-1.24.08-4.97-6.08v6.36l-1.25.08V9.2l1.5-.09Z" />
      </svg>
    )
  }

  return <span>{name.slice(0, 2)}</span>
}

function Modal({
  title,
  eyebrow,
  children,
  onClose,
}: {
  title: string
  eyebrow: string
  children: ReactNode
  onClose: () => void
}) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-card"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h3>{title}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">Close</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

function App() {
  const introRef = useRef<HTMLElement>(null)
  const [activeModal, setActiveModal] = useState<'clients' | 'social' | 'concept' | 'tools' | null>(null)
  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(null)
  const featuredTools = tools.filter((tool) => featuredToolNames.includes(tool.name))
  const extraTools = tools.filter((tool) => !featuredToolNames.includes(tool.name))
  const { scrollYProgress } = useScroll({ target: introRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.45 })
  const nameOpacity = useTransform(progress, [0, 0.42, 0.56], [1, 1, 0])
  const nameY = useTransform(progress, [0, 0.5], [32, -70])
  const quoteOpacity = useTransform(progress, [0.18, 0.35, 0.63, 0.78], [0, 1, 1, 0])
  const quoteY = useTransform(progress, [0.18, 0.55], [42, -18])
  const portalOpacity = useTransform(progress, [0.72, 0.91], [0, 1])

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    if (import.meta.env.DEV) event.preventDefault()
  }

  return (
    <div className="page">
      <section ref={introRef} className="intro" aria-label="Cinematic introduction">
        <div className="intro-sticky">
          <Suspense fallback={<div className="scene-fallback" />}>
            <IntroScene progress={progress as MotionValue<number>} />
          </Suspense>
          <div className="vignette" />
          <div className="intro-meta">
            <span>Personal Brand / AI / Apps / Web</span>
            <span>Romanian / Italian - based in Germany</span>
          </div>
          <motion.div className="name-frame" style={{ opacity: nameOpacity, y: nameY }}>
            <h1>
              <span>LUIS</span>
              <span>FLORIA</span>
            </h1>
            <p>Building apps, websites &amp; social systems.</p>
          </motion.div>
          <motion.blockquote className="intro-quote" style={{ opacity: quoteOpacity, y: quoteY }}>
            &ldquo;If you quit now, they were right.&rdquo;
          </motion.blockquote>
          <div className="scroll-cue">
            <span>Scroll to enter</span>
            <i />
          </div>
          <motion.div className="portal" style={{ opacity: portalOpacity }}>
            <span>01 / Portfolio</span>
            <p>Enter the work</p>
          </motion.div>
        </div>
      </section>

      <main className="portfolio">
        <nav className="nav">
          <a className="wordmark" href="#about">LF</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav-action" href="#contact">Start project</a>
        </nav>

        <section className="about shell" id="about">
          <Reveal className="section-heading">
            <span className="eyebrow">01 / About</span>
            <h2>Built early.<br />Thinking bigger.</h2>
          </Reveal>
          <Reveal className="about-copy">
            <p>
              I&apos;m Luis Floria, a 16-year-old creator based in Germany with Romanian and Italian roots.
              I build apps, websites, brands and content systems using AI, design and automation.
            </p>
            <picture>
              <source srcSet="/images/luis-editorial.webp" type="image/webp" />
              <img src="/images/luis-editorial.jpg" alt="Luis Floria portrait" loading="lazy" />
            </picture>
          </Reveal>
        </section>

        <section className="shell" id="services">
          <Reveal className="section-heading compact">
            <span className="eyebrow">02 / Capabilities</span>
            <h2>What I do</h2>
          </Reveal>
          <div className="capabilities">
            {capabilities.map((capability, index) => (
              <motion.article
                className="glass-card capability"
                key={capability.title}
                tabIndex={0}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                whileHover={{ y: -5, borderColor: 'rgba(52, 91, 220, 0.62)' }}
              >
                <span>0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="shell work" id="work">
          <Reveal className="section-heading compact">
            <span className="eyebrow">03 / Selected work</span>
            <h2>Ideas in motion</h2>
          </Reveal>
          <div className="project-grid">
            {projects.map((project) => (
              <motion.article className="glass-card project" key={project.name} whileHover={{ y: -6 }}>
                <div className="project-top">
                  <span className="project-status">{project.status}</span>
                  <span className="arrow">+</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.action === 'external' && 'href' in project ? (
                  <a href={project.href}>{project.cta}</a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (project.action === 'client-library') setActiveModal('clients')
                      if (project.action === 'social-library') setActiveModal('social')
                      if (project.action === 'concept') setActiveModal('concept')
                    }}
                  >
                    {project.cta}
                  </button>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section className="story shell">
          <Reveal className="story-image">
            <picture>
              <source srcSet="/images/luis-sunset.webp" type="image/webp" />
              <img src="/images/luis-sunset.jpg" alt="Luis Floria at sunset" loading="lazy" />
            </picture>
          </Reveal>
          <Reveal className="story-copy">
            <span className="eyebrow">04 / Personal brand</span>
            <h2>Building while still in school.</h2>
            <p>
              Young founder energy, backed by execution. Apps, websites and social systems shaped into
              one clear direction: create work people remember.
            </p>
          </Reveal>
        </section>

        <section className="shell stack" id="skills">
          <Reveal className="section-heading compact">
            <span className="eyebrow">05 / Stack</span>
            <h2>Tools I build with</h2>
          </Reveal>
          <Reveal className="stack-list">
            {featuredTools.map((tool) => (
              <button type="button" key={tool.name} onClick={() => setActiveTool(tool)}>
                <span className={`tool-icon tool-icon-${tool.icon}`}>
                  <ToolLogo icon={tool.icon} name={tool.name} />
                </span>
                {tool.name}
              </button>
            ))}
            <button type="button" className="more-tools-button" onClick={() => setActiveModal('tools')}>
              <span className="tool-icon">+</span>
              More tools
            </button>
          </Reveal>
        </section>

        <section className="shell offer">
          <Reveal>
            <span className="eyebrow">06 / Services</span>
            <h2>Let&apos;s build<br />your idea.</h2>
          </Reveal>
          <Reveal className="service-list">
            {services.map((service) => <span key={service}>{service}</span>)}
            <a className="button" href="#contact">Start a project</a>
          </Reveal>
        </section>

        <section className="contact shell" id="contact">
          <Reveal className="contact-copy">
            <span className="eyebrow">07 / Contact</span>
            <h2>Start with<br />an idea.</h2>
            <p>Websites, apps, content systems or a brand ready for its next move.</p>
            <div className="contact-methods">
              <a href={socialLinks[0].href}>Instagram</a>
              <span>Email</span>
              <span>Project inquiry</span>
            </div>
          </Reveal>
          <Reveal className="inquiry">
            <form name="project-inquiry" method="POST" data-netlify="true" onSubmit={submitInquiry}>
              <input type="hidden" name="form-name" value="project-inquiry" />
              <label>
                Name
                <input name="name" type="text" required />
              </label>
              <label>
                Project type
                <select name="project-type" required defaultValue="">
                  <option value="" disabled>Select project</option>
                  {services.map((service) => <option key={service}>{service}</option>)}
                </select>
              </label>
              <label>
                Budget
                <select name="budget" required defaultValue="">
                  <option value="" disabled>Select range</option>
                  <option>Under EUR 1,000</option>
                  <option>EUR 1,000 - 3,000</option>
                  <option>EUR 3,000+</option>
                </select>
              </label>
              <label className="message">
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button className="button" type="submit">Start a project</button>
            </form>
          </Reveal>
        </section>

        <section className="socials-visible shell" aria-label="Social links">
          <Reveal className="section-heading compact">
            <span className="eyebrow">08 / Socials</span>
            <h2>Follow the build</h2>
          </Reveal>
          <Reveal className="visible-social-grid">
            {socialLinks.map((profile) => (
              <a className="visible-social-card" href={profile.href} key={profile.platform}>
                <span>{profile.platform}</span>
                <p>{profile.description}</p>
                <small>Open profile</small>
              </a>
            ))}
          </Reveal>
        </section>
      </main>

      <footer>
        <span>LUIS FLORIA</span>
        <span>Personal Brand / Germany</span>
        <span>&copy; 2026</span>
      </footer>

      {activeModal === 'clients' && (
        <Modal title="Client Websites" eyebrow="Website library" onClose={() => setActiveModal(null)}>
          <div className="library-grid">
            {clientWebsites.map((website) => (
              <article className="library-card" key={website.title}>
                <img src={website.image} alt="" loading="lazy" />
                <div>
                  <h4>{website.title}</h4>
                  <p>{website.description}</p>
                  <a href={website.href}>
                    Open Website
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'social' && (
        <Modal title="Social Media Projects" eyebrow="Profiles" onClose={() => setActiveModal(null)}>
          <div className="social-grid">
            {socialLinks.map((profile) => (
              <article className="social-card" key={profile.platform}>
                <span>{profile.platform}</span>
                <p>{profile.description}</p>
                <a href={profile.href}>
                  Open Profile
                </a>
              </article>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === 'concept' && (
        <Modal title="EntrepreneurAI" eyebrow="Concept" onClose={() => setActiveModal(null)}>
          <p className="modal-copy">
            An AI-powered entrepreneurship concept that helps young people turn ideas into clear business action.
          </p>
        </Modal>
      )}

      {activeModal === 'tools' && (
        <Modal title="More Tools" eyebrow="Full stack" onClose={() => setActiveModal(null)}>
          <div className="tools-grid">
            {extraTools.map((tool) => (
              <button
                type="button"
                className="tools-grid-card"
                key={tool.name}
                onClick={() => {
                  setActiveModal(null)
                  setActiveTool(tool)
                }}
              >
                <span className={`tool-icon tool-icon-${tool.icon}`}>
                  <ToolLogo icon={tool.icon} name={tool.name} />
                </span>
                <strong>{tool.name}</strong>
                <small>{tool.description}</small>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {activeTool && (
        <Modal title={activeTool.name} eyebrow="Tool stack" onClose={() => setActiveTool(null)}>
          <div className="tool-modal">
            <span className={`tool-modal-icon tool-icon-${activeTool.icon}`}>
              <ToolLogo icon={activeTool.icon} name={activeTool.name} />
            </span>
            <p>{activeTool.description}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default App
