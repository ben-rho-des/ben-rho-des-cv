<script lang="ts"></script>

<div class="grid grid-cols-6 gap-x-5">
  <!-- Main CV Section -->
  <section class="col-span-3">
    <h1 class="text-4xl font-bold mb-4">Curriculum Vitae</h1>
    <h2 class="text-2xl font-semibold mb-4">Ben Rhodes — Senior Full-Stack Developer</h2>
    <p class="text-lg text-gray-600 mb-6 italic">I ship accessible, performant UIs and sturdy back ends. 15+ years across healthtech & finance. I keep it typed, tested, and friendly.</p>
    <div class="h-px bg-secondary opacity-25 mb-8"></div>
  </section>

  <!-- Contact Section -->
  <aside class="col-span-3">
    <h2 class="text-2xl font-semibold mb-4">Contact & Links</h2>
    <p class="text-gray-600 mb-4">Melbourne, Australia (AEST/AEDT)</p>
    <p class="mb-2"><a href="/contact" class="font-semibold text-primary hover:underline">Contact form</a> <span class="text-gray-600">• quickest way to reach me</span></p>
    <p class="mb-2"><a href="http://au.linkedin.com/in/ben-rhodes-a67a0234" target="_blank" rel="noopener" class="text-primary hover:underline">LinkedIn</a></p>
    <p class="mb-4"><a href="https://github.com/ben-rho-des" target="_blank" rel="noopener" class="text-primary hover:underline">GitHub</a></p>
    <div class="h-px bg-primary opacity-25 mb-8"></div>
  </aside>

  <!-- Work Experience -->
  <section class="col-span-3">
    <h2 class="text-2xl font-semibold mb-6">Work Experience</h2>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2">Lead Full-Stack Developer · Ingenovis Health</h3>
      <div class="text-primary italic mb-2">Permanent · 2021 — Present</div>
      <div class="text-secondary italic mb-4">Stack: React 18 · Next.js (SSR) 14 · Emotion + MUI (custom) · Auth0 · Contentful · Bullhorn (ATS) · Python/FastAPI · Postgres · AWS (EKS) · GitHub Actions · Monorepo (Rush) · Capacitor</div>

      <p class="mb-4">
        Led the consolidation of multiple healthcare recruitment brands (Fastaff, USNursing, Trustaff) into a <strong>shared, themable platform</strong>, reducing duplication and enabling shared leads and recruiter resources.
      </p>
      <ul class="space-y-2 mb-4">
        <li><strong>Designed & shipped</strong> a component library with per-brand theming; adopted across marketing, candidate and recruiter apps.</li>
        <li>Built a <strong>candidate portal</strong> (profile + job applications) and a <strong>recruiter app</strong> with RBAC, brand scoping and Bullhorn integration.</li>
        <li>Integrated <strong>Contentful</strong> via a custom content model; built a new Ingenovis marketing site on the design system.</li>
        <li>Re-engineered the portal + library to run as a <strong>Capacitor</strong> cross-platform app (iOS & Android).</li>
        <li>Created an <strong>interactive job-search map</strong> and SSR pages for speed, SEO and analytics cleanliness.</li>
        <li><strong>Virtual list</strong> component cut item selection from <strong>40–60s → ~1.5s</strong>, eliminating a major user pain point.</li>
        <li>Set up Auth0, CI/CD with GitHub Actions and AWS infra; ran guilds for consistency and shared standards.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2">Senior Full-Stack Developer · NAB (National Australia Bank)</h3>
      <div class="text-primary italic mb-2">Permanent 2018 — 2021 · Odecee 2016 — 2018</div>
      <div class="text-secondary italic mb-4">Focus: Developer Platforms · API Design · Micro-frontends · GraphQL · OAuth</div>

      <ul class="space-y-2 mb-4">
        <li>Built a <strong>Next.js + TypeScript API portal</strong> for publishing docs, collaborating on models and promoting consistent API design.</li>
        <li>Architected a <strong>micro-frontend</strong> suite (4 React apps) with GraphQL services, an Express microservice and 3rd-party auth.</li>
        <li>Designed <strong>HATEOAS-style</strong> microservice APIs with OAuth for sandboxed client integrations.</li>
        <li>Created an <strong>AsyncAPI JSON-schema library</strong> + custom editor; added search across REST & event APIs.</li>
        <li>Delivered a full-stack inner-source tool in ~1 month to automate data extraction from private Git; onboarded team to own it.</li>
        <li><span class="font-bold text-secondary">NAB Connect:</span> led modernization of the business banking web platform—unified patterns, testing, and dev workflow.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2">Front-End Developer · Australian Financial Review (Fairfax Media)</h3>
      <div class="text-primary italic mb-4">2014 — 2016</div>
      <ul class="space-y-2 mb-4">
        <li>Built a bespoke <strong>HTML pattern library</strong> (OOCSS), performance tuning and UX/user-testing loops.</li>
        <li>Set up CI/CD tasks for <strong>perceptual diff</strong> and <strong>accessibility</strong> testing; authored custom Node plugins.</li>
        <li>Designed and shipped marketing pages with measurable speed and accessibility improvements.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2">Front-End Developer · Cobe Design</h3>
      <div class="text-primary italic mb-4">2012 — 2014</div>
      <p class="mb-4">Product and marketing front-ends, design collaboration, and componentized CSS at agency pace.</p>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2">Front-End Developer · Elastic Digital</h3>
      <div class="text-primary italic mb-4">2009 — 2012</div>
      <p class="mb-4">Flash & HTML development, illustration and animation for clients including VMware, EMC, Adobe, Cisco, Symantec, EFTPOS and more.</p>
    </article>
  </section>

  <!-- Right column: Skills / Education -->
  <aside class="col-span-3">
    <h2 class="text-2xl font-semibold mb-6">Skills</h2>
    <p class="text-primary font-semibold mb-2">Frontend</p>
    <ul class="space-y-2 mb-4">
      <li>Accessible HTML · CSS (Sass/Less/Stylus, CSS-in-JS) · <strong>React</strong> · <strong>TypeScript</strong> · Next.js · Angular 1/2+</li>
    </ul>
    <p class="text-primary font-semibold mb-2">Backend & Data</p>
    <ul class="space-y-2 mb-4">
      <li><strong>Node.js</strong> (Express/Fastify) · Python (FastAPI) · GraphQL · REST · Postgres</li>
    </ul>
    <p class="text-primary font-semibold mb-2">Cloud & DevOps</p>
    <ul class="space-y-2 mb-4">
      <li>AWS (EKS, S3, CloudFront, Lambda) · CI/CD (GitHub Actions) · Monorepos (Rush)</li>
    </ul>
    <p class="text-primary font-semibold mb-2">Testing & Quality</p>
    <ul class="space-y-2 mb-6">
      <li>Jest · Playwright · Cypress · React Testing Library · aXe Core · Protractor (legacy)</li>
    </ul>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-2xl font-semibold mb-6">Education & Certs</h2>
    <ul class="space-y-2 mb-4">
      <li><strong>AWS Associate Developer</strong> (2020)</li>
      <li>Short Course, Digital Design — <em>Tractor</em> (2013–2014)</li>
      <li>Advanced Diploma of Graphic Design — <em>St George College of Design</em> (2007–2010)</li>
    </ul>

    <div class="h-px bg-primary opacity-25"></div>
  </aside>
</div>

<!-- Responsive styles -->
<style>
  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .col-span-3 {
      grid-column: 1 / -1;
    }
  }
  
  @media print {
    .grid {
      padding: 0;
    }
    
    a {
      border: 0;
    }
  }
</style>
