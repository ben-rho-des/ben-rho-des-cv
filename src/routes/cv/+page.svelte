<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
</script>

<div class="grid grid-cols-6 gap-x-5">
  <PageTitle title="Curriculum Vitae">
    <a class="bubble display-font-alt uppercase text-2xl self-center" target="_blank" rel="noopener" href="ben-rho-des-cv-2025.pdf">Download pdf</a>
  </PageTitle>

  <section class="col-span-6">
    <h2 class="text-2xl font-semibold mb-4 text-primary">About</h2>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-4 text-secondary">Seeking my next opportunity as a full stack developer in a remote or hybrid role (1-2 days on site near Southern Cross).</p>
    <p class="mb-4">I'm proactive, self driven, love achieving goals and building for scale and long term success.</p>
    <p class="mb-6 italic">I ship accessible, performant UIs and sturdy back ends. 10+ years across media, healthtech & finance. I keep it typed, tested, and friendly.</p>
    <p class="mb-6">Deeper on the frontend side of things, but I have a strong understanding of the backend and data. It's important for me to be hands on in both.</p>
    <p class="mb-4 ">You can check out my playground style github here 
      <span class="hover:underline text-black dark:text-white "><a href="https://github.com/ben-rho-des" target="_blank" rel="noopener" >github.com/ben-rho-des</a></span>
    </p>
    <div class="h-px bg-secondary opacity-25 mb-8"></div>
  </section>

  <section class="col-span-3">
    <h2 class="text-2xl font-semibold mb-6 text-primary">Work Experience</h2>

    <article class="mb-8">
      <h3 class="text-secondary text-lg font-semibold mb-2">Senior Frontend Developer · Connective</h3>
      <div class="italic mb-2">Permanent · Jan 2025 — Present</div>
      <div class="italic mb-4">Stack: Tailwind, TypeScript, Redux Toolkit, Zod, React Hook Form, Auth0, Java Spring Boot, Postgres</div>

      <ul class="space-y-2 mb-4">
        <li>Contributed to <strong>Loan Calculator features</strong> in React/TypeScript with form handling and validation using Zod + React Hook Form.</li>
        <li>Redux Toolkit for state management.</li>
        <li>BAU features for legacy React codebase.</li>
        <li>Worked on <strong>Auth0 integration</strong> and API integration with Java Spring Boot backend.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-secondary text-lg font-semibold mb-2">Lead Full-Stack Developer · Ingenovis Health</h3>
      <div class="italic mb-2">Permanent · Sep 2021 — Jan 2025</div>
      <div class="italic mb-4">Stack: React 18, Next.js (SSR) 14, Emotion + MUI (custom), Auth0, Contentful, Bullhorn (ATS), Python/FastAPI, Postgres, AWS (EKS), GitHub Actions, Monorepo (Rush), Capacitor</div>

      <p class="mb-4">
        Led the consolidation of multiple healthcare recruitment brands (Fastaff, USNursing, Trustaff) into a <strong>shared, themable platform</strong>, reducing duplication and enabling shared leads and recruiter resources.
      </p>
      <ul class="space-y-2 mb-4">
        <li><strong>Designed & shipped</strong> a component library with per-brand theming; adopted across marketing, candidate and recruiter apps.</li>
        <li>Built a <strong>candidate portal</strong> (profile + job applications) and a <strong>recruiter app</strong> with RBAC, brand scoping and Bullhorn integration.</li>
        <li>Integrated <strong>Contentful</strong> via a custom content model; built a new Ingenovis marketing site with the design system.</li>
        <li>Re-engineered the portal + library to run as a <strong>Capacitor</strong> cross-platform app (iOS & Android).</li>
        <li>Created an <strong>interactive job-search map</strong> (customized Google Maps) and SSR pages for speed, SEO and analytics cleanliness.</li>
        <li>Set up Auth0, helped integrate CI/CD with GitHub Actions and AWS infra; ran guilds for consistency and shared standards.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-secondary text-lg font-semibold mb-2">Senior Full-Stack Developer · NAB (National Australia Bank)</h3>
      <div class="italic mb-2">Permanent 2018 — 2021 · Contractor 2016 — 2018</div>
      <div class="italic mb-4">Focus: Developer Platforms, API Design, Micro-frontends, GraphQL, OAuth, API Gateways</div>

      <ul class="space-y-2 mb-4">
        <li>Built a <strong>Next.js + TypeScript API portal</strong> for publishing docs, collaborating on models and promoting consistent API design.</li>
        <li>Architected a <strong>micro-frontend</strong> suite (4 React apps) with GraphQL services, an Express microservice and 3rd-party auth.</li>
        <li>Designed <strong>HATEOAS-style</strong> microservice APIs with OAuth for sandboxed client integrations.</li>
        <li>Created an <strong>AsyncAPI JSON-schema library</strong> + custom editor; added search across REST & event APIs.</li>
        <li><span class="font-bold ">NAB Connect:</span> led modernization of the business banking web platform.</li>
      </ul>
    </article>

    <article class="mb-8">
      <h3 class="text-secondary text-lg font-semibold mb-2">Front-End Developer · Australian Financial Review (Fairfax Media)</h3>
      <div class="italic mb-4">Permanent · 2014 — 2016</div>
      <ul class="space-y-2 mb-4">
        <li>Built a bespoke <strong>HTML pattern library</strong> (OOCSS), performance tuning and UX/user-testing loops.</li>
        <li>Set up CI/CD tasks for <strong>perceptual diff</strong> and <strong>accessibility</strong> testing; authored custom Node plugins.</li>
        <li>Designed and shipped marketing pages with measurable speed and accessibility improvements.</li>
      </ul>
    </article>

   
  </section>

  <!-- Right column: Skills / Education / Goals / Values -->
  <aside class="col-span-3">
    <h2 class="text-2xl font-semibold mb-6 text-primary">Skills</h2>
    <h3 class="text-secondary text-base font-semibold mb-2">Frontend</h3>
    <ul class="space-y-2 mb-4">
      <li>Accessible HTML · CSS (Sass/Less/Stylus, CSS-in-JS) · <strong>React</strong> · <strong>TypeScript</strong> · Next.js · Angular 1+ · <strong>Svelte</strong></li>
    </ul>
    <h3 class="text-secondary text-base font-semibold mb-2">Backend</h3>
    <ul class="space-y-2 mb-4">
      <li><strong>Node.js</strong> (Express/TSOA/Nuxt) · <strong>Python</strong> (FastAPI) · GraphQL · REST · Postgres</li>
    </ul>
    <h3 class="text-secondary text-base font-semibold mb-2">Cloud + Ops</h3>
    <ul class="space-y-2 mb-4">
      <li>AWS (EKS, S3, CloudFront, Lambda) · CI/CD (GitHub Actions) · Monorepos (Rush, Nx)</li>
    </ul>
    <h3 class="text-secondary text-base font-semibold mb-2">Test & Quality</h3>
    <ul class="space-y-2 mb-6">
      <li>Jest · Playwright · Cypress · React Testing Library · Protractor (legacy)</li>
    </ul>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-2xl font-semibold mb-6 text-primary">Goals</h2>
    <ul class="space-y-2 mb-6">
      <li>Solidify myself as a fullstack tech lead</li>
      <li>Upskill in UI - It's been a while since I've done design, I want to get into it again</li>
      <li>Continue growing into technical leadership while exploring opportunities to innovate and build products that make a difference</li>
    </ul>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-2xl font-semibold mb-6 text-primary">Values</h2>
    <ol class="space-y-2 mb-6 list-decimal pl-8">
      <li>Be myself</li>
      <li>Be optimistic</li>
      <li>Have fun and be an encouraging light in a dark world</li>
      <li>Foster a safe environment & Help others</li>
      <li>Care</li>
    </ol>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-2xl font-semibold mb-6 text-primary">Interests</h2>
    <h3 class="text-secondary text-base font-semibold mb-2">DIY Projects</h3>
    <p class="mb-4">I love renovation projects, currently making a home office/studio in a shipping container.</p>
    
    <h3 class="text-secondary text-base font-semibold mb-2">Strategy Collectable Games</h3>
    <p class="mb-6">Magic the Gathering, Hearthstone and Marvel Snap - I love learning about the meta, and the different strategies and playstyles. It keeps me on my toes and helps me think creatively in a non-stressful environment.</p>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-2xl font-semibold mb-6 text-primary">Education & Certs</h2>
    <ul class="space-y-2 mb-4">
      <li>AWS Associate Developer (2020)</li>
      <li>Short Course, Digital Design — <em>Tractor</em> (2013–2014)</li>
      <li>Advanced Diploma of Graphic Design — <em>St George College of Design</em> (2007–2010)</li>
    </ul>

    <div class="h-px bg-secondary opacity-25 mb-6"></div>

    <h2 class="text-xl font-semibold mb-6 text-primary">Earlier Experience</h2>
    <article class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Front-End Developer · Cobe Design</h3>
      <div class="italic mb-2">2012 — 2014</div>
    </article>

    <article class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Front-End Developer · Elastic Digital</h3>
      <div class="italic mb-2">2009 — 2012</div>
    </article>
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
