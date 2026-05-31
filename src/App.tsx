import { lazy, Suspense, type FormEvent, type ReactNode, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { capabilities, clientWebsites, projects, services, socialLinks, tools } from './portfolioData'
import './App.css'

const IntroScene = lazy(() => import('./IntroScene'))

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

function openExternalLink(href?: string) {
  if (!href || href === '#') return
  window.open(href, '_blank', 'noopener,noreferrer')
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
  const [activeModal, setActiveModal] = useState<'clients' | 'social' | 'concept' | null>(null)
  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(null)
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
                <button
                  type="button"
                  onClick={() => {
                    if (project.action === 'external') openExternalLink('href' in project ? project.href : undefined)
                    if (project.action === 'client-library') setActiveModal('clients')
                    if (project.action === 'social-library') setActiveModal('social')
                    if (project.action === 'concept') setActiveModal('concept')
                  }}
                >
                  {project.cta}
                </button>
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
            {tools.map((tool) => (
              <button type="button" key={tool.name} onClick={() => setActiveTool(tool)}>
                <span className="tool-icon">{tool.icon}</span>
                {tool.name}
              </button>
            ))}
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
              <span>Instagram</span>
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
                  <button type="button" onClick={() => openExternalLink(website.href)}>
                    Open Website
                  </button>
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
                <button type="button" onClick={() => openExternalLink(profile.href)}>
                  Open Profile
                </button>
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

      {activeTool && (
        <Modal title={activeTool.name} eyebrow="Tool stack" onClose={() => setActiveTool(null)}>
          <div className="tool-modal">
            <span className="tool-modal-icon">{activeTool.icon}</span>
            <p>{activeTool.description}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default App
