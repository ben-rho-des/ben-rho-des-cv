<script lang="ts"></script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: var(--column-gap);
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .muted { 
    color: #555; 
  }
  
  .kicker { 
    color: var(--secondary); 
    font-weight: 700; 
  }
  
  .meta { 
    color: var(--primary); 
    font-style: italic; 
  }
  
  .stack { 
    color: var(--secondary); 
    font-style: italic; 
  }

  .eyeline-alt {
    color: var(--primary); 
  }
  
  .rule { 
    height: 1px; 
    background: currentColor; 
    opacity: .25; 
  }
  
  .list { 
    margin: .25rem 0 .5rem 0; 
  }
  
  .list li { 
    margin: .15rem 0; 
  }
  
  .chip { 
    font-weight: 700; 
    color: var(--secondary); 
  }
  
  .pill { 
    background: rgba(0,0,0,.04); 
    padding: .08rem .4rem; 
    border-radius: 999px; 
  }

  /* layout placements (6 cols) */
  .cv { 
    grid-column: 1 / 4; 
  }
  
  .contact { 
    grid-column: 5 / 7; 
  }
  
  .work { 
    grid-column: 1 / 4; 
  }
  
  .side { 
    grid-column: 5 / 7; 
  }
  
  /* responsive */
  @media (max-width: 860px) {
    .container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .cv, .contact, .work, .side { 
      grid-column: 1 / -1; 
    }
  }
  
  /* print */
  @media print {
    .container { 
      padding: 0; 
    }
    
    a { 
      border: 0; 
    }
  }
</style>

<div class="page-grid">
  <section class="cv">
    <h1>Curriculum Vitae</h1>
    <h2>Ben Rhodes — Senior Full-Stack Developer</h2>
    <p class="muted lead"><em>I ship accessible, performant UIs and sturdy back ends. 15+ years across healthtech & finance. I keep it typed, tested, and friendly.</em></p>
    <div class="rule" style="color:var(--secondary)"></div>
  </section>

  <aside class="contact">
    <h2>Contact & Links</h2>
    <p class="muted">Melbourne, Australia (AEST/AEDT)</p>
    <p><a href="/contact"><strong>Contact form</strong></a> <span class="muted">• quickest way to reach me</span></p>
    <p><a href="http://au.linkedin.com/in/ben-rhodes-a67a0234" target="_blank" rel="noopener">LinkedIn</a></p>
    <p><a href="https://github.com/ben-rho-des" target="_blank" rel="noopener">GitHub</a></p>
    <div class="rule" style="color:var(--primary)"></div>
  </aside>

  <!-- Work Experience -->
  <section class="work">
    <h2>Work Experience</h2>

    <article>
      <h3>Lead Full-Stack Developer · Ingenovis Health</h3>
      <div class="meta">Permanent · 2021 — Present</div>
      <div class="stack">Stack: React 18 · Next.js (SSR) 14 · Emotion + MUI (custom) · Auth0 · Contentful · Bullhorn (ATS) · Python/FastAPI · Postgres · AWS (EKS) · GitHub Actions · Monorepo (Rush) · Capacitor</div>

      <p>
        Led the consolidation of multiple healthcare recruitment brands (Fastaff, USNursing, Trustaff) into a <strong>shared, themable platform</strong>, reducing duplication and enabling shared leads and recruiter resources.
      </p>
      <ul class="list">
        <li><strong>Designed & shipped</strong> a component library with per-brand theming; adopted across marketing, candidate and recruiter apps.</li>
        <li>Built a <strong>candidate portal</strong> (profile + job applications) and a <strong>recruiter app</strong> with RBAC, brand scoping and Bullhorn integration.</li>
        <li>Integrated <strong>Contentful</strong> via a custom content model; built a new Ingenovis marketing site on the design system.</li>
        <li>Re-engineered the portal + library to run as a <strong>Capacitor</strong> cross-platform app (iOS & Android).</li>
        <li>Created an <strong>interactive job-search map</strong> and SSR pages for speed, SEO and analytics cleanliness.</li>
        <li><strong>Virtual list</strong> component cut item selection from <strong>40–60s → ~1.5s</strong>, eliminating a major user pain point.</li>
        <li>Set up Auth0, CI/CD with GitHub Actions and AWS infra; ran guilds for consistency and shared standards.</li>
      </ul>
    </article>

    <article>
      <h3>Senior Full-Stack Developer · NAB (National Australia Bank)</h3>
      <div class="meta">Permanent 2018 — 2021 · Odecee 2016 — 2018</div>
      <div class="hotline stack">Focus: Developer Platforms · API Design · Micro-frontends · GraphQL · OAuth</div>

      <ul class="list">
        <li>Built a <strong>Next.js + TypeScript API portal</strong> for publishing docs, collaborating on models and promoting consistent API design.</li>
        <li>Architected a <strong>micro-frontend</strong> suite (4 React apps) with GraphQL services, an Express microservice and 3rd-party auth.</li>
        <li>Designed <strong>HATEOAS-style</strong> microservice APIs with OAuth for sandboxed client integrations.</li>
        <li>Created an <strong>AsyncAPI JSON-schema library</strong> + custom editor; added search across REST & event APIs.</li>
        <li>Delivered a full-stack inner-source tool in ~1 month to automate data extraction from private Git; onboarded team to own it.</li>
        <li><span class="chip">NAB Connect:</span> led modernization of the business banking web platform—unified patterns, testing, and dev workflow.</li>
      </ul>
    </article>

    <article>
      <h3>Front-End Developer · Australian Financial Review (Fairfax Media)</h3>
      <div class="meta">2014 — 2016</div>
      <ul class="list">
        <li>Built a bespoke <strong>HTML pattern library</strong> (OOCSS), performance tuning and UX/user-testing loops.</li>
        <li>Set up CI/CD tasks for <strong>perceptual diff</strong> and <strong>accessibility</strong> testing; authored custom Node plugins.</li>
        <li>Designed and shipped marketing pages with measurable speed and accessibility improvements.</li>
      </ul>
    </article>

    <article>
      <h3>Front-End Developer · Cobe Design</h3>
      <div class="meta">2012 — 2014</div>
      <p>Product and marketing front-ends, design collaboration, and componentized CSS at agency pace.</p>
    </article>

    <article>
      <div class="eyeline">Front-End Developer · Elastic Digital</div>
      <div class="meta">2009 — 2012</div>
      <p>Flash & HTML development, illustration and animation for clients including VMware, EMC, Adobe, Cisco, Symantec, EFTPOS and more.</p>
    </article>
  </section>

  <!-- Right column: Skills / Education -->
  <aside class="side">
    <h2>Skills</h2>
    <p class="eyeline-alt">Frontend</p>
    <ul class="list">
      <li>Accessible HTML · CSS (Sass/Less/Stylus, CSS-in-JS) · <strong>React</strong> · <strong>TypeScript</strong> · Next.js · Angular 1/2+</li>
    </ul>
    <p class="eyeline-alt">Backend & Data</p>
    <ul class="list">
      <li><strong>Node.js</strong> (Express/Fastify) · Python (FastAPI) · GraphQL · REST · Postgres</li>
    </ul>
    <p class="eyeline-alt">Cloud & DevOps</p>
    <ul class="list">
      <li>AWS (EKS, S3, CloudFront, Lambda) · CI/CD (GitHub Actions) · Monorepos (Rush)</li>
    </ul>
    <p class="eyeline-alt">Testing & Quality</p>
    <ul class="list">
      <li>Jest · Playwright · Cypress · React Testing Library · aXe Core · Protractor (legacy)</li>
    </ul>

    <div class="rule" style="color:var(--secondary)"></div>

    <h2>Education & Certs</h2>
    <ul class="list">
      <li><strong>AWS Associate Developer</strong> (2020)</li>
      <li>Short Course, Digital Design — <em>Tractor</em> (2013–2014)</li>
      <li>Advanced Diploma of Graphic Design — <em>St George College of Design</em> (2007–2010)</li>
    </ul>

    <div class="rule" style="color:var(--primary)"></div>
  </aside>
</div>
