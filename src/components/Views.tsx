import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import euPhoto from '../assets/eu.jpeg';

gsap.registerPlugin(ScrollTrigger);

interface ViewProps {
  isActive: boolean;
  isVisible: boolean;
}

function useScrollAnimation(selector: string, options?: gsap.TweenVars) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);

    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
          ...options,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [selector, options]);

  return containerRef;
}

export function HomeView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.bio-text span');

  if (!isActive) return null;

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-home">
      <img src={euPhoto} alt="Henrique Santos" className="bio-photo" />
      <p className="bio-text">
        <span>Desenvolvedor Full Stack</span>
        <span className="dim">em formação pela</span>
        <span>escola técnica COTEMIG,</span>
        <span className="dim">apaixonado por</span>
        <span>tecnologia e</span>
        <span className="dim">inteligência artificial.</span>
        <span>Focado na criação de</span>
        <span className="dim">soluções eficientes,</span>
        <span>elegantes e inovadoras</span>
        <span className="dim">para problemas complexos.</span>
        <span>Profissional comprometido,</span>
        <span className="dim">proativo e constantemente</span>
        <span>motivado a aprender e</span>
        <span className="dim">evoluir em ambiente</span>
        <span>de equipe.</span>
      </p>
    </div>
  );
}

export function ProjectsView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.project-item');

  if (!isActive) return null;

  const projects = [
    { title: 'Florenza', meta: '', desc: 'Aplicação web para startup de óleos essenciais para ansiedade.', href: 'https://github.com/henriquechr11/florenza' },
    { title: 'Save the Earth', meta: '', desc: 'Aplicação web para conscientização sobre redução do carbono.', href: 'https://github.com/henriquechr11/save_the_earth' },
    { title: 'Gerenciador de Tarefas', meta: '', desc: 'Gerenciador de tarefas para organização e definição de prioridades.', href: 'https://github.com/henriquechr11/Gerenciador-de-tarefas' },
    { title: 'Criptohive', meta: '', desc: 'Site sobre criptomoedas utilizando a API Coingecko.', href: 'https://github.com/henriquechr11/Cripto-Hive' },
    { title: 'Jobs Graphics', meta: '', desc: 'Curso de Python da Alura sobre análise de dados.', href: 'https://github.com/henriquechr11/Jobs_graphics' },
    { title: 'CRUD Cotemig', meta: '', desc: 'Código em C# integrado com MySQL sobre armazenamento de alunos.', href: 'https://github.com/henriquechr11/projeto-app-escola' },
  ];

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-projects">
      <p className="section-label">Selected Work</p>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <a className="project-title" href={project.href} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
            <p className="project-meta">{project.meta}</p>
            <p className="project-desc">{project.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfoView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.info-item');

  if (!isActive) return null;

  const infoItems = [
    { label: 'Email', value: 'henriquestv18@gmail.com', href: 'mailto:henriquestv18@gmail.com' },
    { label: 'GitHub', value: 'henriquechr11', href: 'https://github.com/henriquechr11' },
    { label: 'WhatsApp', value: '+55 31 98527-1685', href: 'https://wa.me/5531985271685' },
    { label: 'Instagram', value: '@henriquesantostv', href: 'https://instagram.com/henriquesantostv' },
    { label: 'LinkedIn', value: 'Henrique Santos Tavares', href: 'https://www.linkedin.com/in/henrique-santos-tavares-81418436a' },
  ];

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-info">
      <p className="section-label">Info</p>
      <div className="info-grid">
        {infoItems.map((item, index) => (
          <div key={index} className="info-item">
            <p className="info-label">{item.label}</p>
            {item.href ? (
              <a className="info-value" href={item.href} target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ) : (
              <p className="info-value">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FAQView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.faq-item');

  if (!isActive) return null;

  const faqs = [
    { question: 'Qual é o seu processo de trabalho?', answer: 'Começo com pesquisa e imersão no contexto do projeto, seguido de wireframes e prototipagem em alta fidelidade. Depois, desenvolvo o front-end com foco em performance e detalhes visuais.' },
    { question: 'Que tecnologias você utiliza?', answer: 'MySQL, C#, N8N, Kotlin, Swift, Flutter, React, TypeScript, Python, Git, HTML, CSS, Tailwind CSS, JavaScript, APIs, Supabase, PostgreSQL, Figma e Stitch.' },
    { question: 'Você trabalha com projetos freelance?', answer: 'Sim, estou aberto a projetos freelance selecionados. Prefiro colaborações de médio a longo prazo onde posso contribuir tanto no design quanto no desenvolvimento.' },
    { question: 'Qual o prazo médio de um projeto?', answer: 'Depende da complexidade, mas geralmente entre 4 e 12 semanas. Projetos com identidade visual e desenvolvimento completo tendem a levar mais tempo.' },
  ];

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-faq">
      <p className="section-label">FAQ</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <p className="faq-question">{faq.question}</p>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.experience-item');

  if (!isActive) return null;

  const experiences = [
    {
      role: 'Desenvolvedor Back-end',
      company: 'Hashtag Comunicações',
      period: 'Atual',
      description: 'Atuação no desenvolvimento de automações utilizando n8n e JavaScript.',
      highlights: [
        'Implementação de sistemas baseados em inteligência artificial utilizando bases de conhecimento (RAG e Engenharia de Prompts)',
        'Integração e gerenciamento de bancos de dados e sistemas de cache em memória',
      ],
    },
    {
      role: 'Desenvolvedor Front-End',
      company: 'Agência K21 Digital',
      period: 'Anterior',
      description: 'Atuação no desenvolvimento e manutenção de interfaces responsivas, com foco total na experiência do usuário (UX) e na otimização de performance de páginas web.',
    },
  ];

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-experience">
      <p className="section-label">Experience</p>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <p className="experience-role">{exp.role}</p>
              <p className="experience-company">{exp.company}</p>
            </div>
            <p className="experience-period">{exp.period}</p>
            <p className="experience-description">{exp.description}</p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="experience-highlights">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactView({ isActive, isVisible }: ViewProps) {
  const containerRef = useScrollAnimation('.contact-text span, .contact-email');

  if (!isActive) return null;

  return (
    <div ref={containerRef} className={`view-container ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`} id="view-contact">
      <p className="section-label">Contact</p>
      <p className="contact-text">
        <span>Tem um projeto</span>
        <span>em mente?</span>
        <span>Vamos conversar.</span>
      </p>
      <a className="contact-email" href="https://wa.me/5531985271685" target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-block' }}>+55 31 98527-1685</a>
    </div>
  );
}

