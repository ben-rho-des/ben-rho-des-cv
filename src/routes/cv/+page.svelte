<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import FileDocument from '$lib/components/icons/FileDocument.svelte';
</script>

<div class="grid grid-cols-6 gap-x-5">
	<PageTitle title="Curriculum Vitae">
		<a
			class="bubble display-font-alt flex items-center gap-2 self-center text-2xl uppercase"
			target="_blank"
			rel="noopener"
			href="ben-rho-des-cv-2025.pdf"
		>
			<FileDocument size={24} />
			Download pdf
		</a>
	</PageTitle>

	<section class="col-span-6">
		<h2 class="mb-4 text-2xl font-semibold text-primary">About</h2>
		<p class="mb-4 text-lg text-secondary">
			Seeking my next opportunity as a full stack developer in a remote or hybrid role (1-2 days on
			site near Southern Cross).
		</p>
		<p class="mb-4">
			I'm proactive, self driven, love achieving goals and building for scale and long term success.
		</p>
		<p class="mb-6 italic">
			I ship accessible, performant UIs and sturdy back ends. 10+ years across media, healthtech &
			finance. I keep it typed, tested, and friendly.
		</p>
		<p class="mb-6">
			Deeper on the frontend side of things, but I have a strong understanding of the backend and
			data. It's important for me to be hands on in both.
		</p>
		<p class="mb-4">
			You can check out my playground style github here
			<span class="text-gray-600 underline dark:text-gray-400"
				><a href="https://github.com/ben-rho-des" target="_blank" rel="noopener"
					>github.com/ben-rho-des</a
				></span
			>
		</p>
		<div class="mb-8 h-px bg-secondary opacity-25"></div>
	</section>

	<section class="col-span-3">
		<h2 class="mb-6 text-2xl font-semibold text-primary">Work Experience</h2>

		<article class="mb-8">
			<h3 class="mb-2 text-lg font-semibold text-secondary">
				Senior Frontend Developer · Connective
			</h3>
			<div class="mb-2 italic">Permanent · Jan 2025 — Present</div>
			<div class="mb-4 italic">
				Stack: Tailwind, TypeScript, Redux Toolkit, Zod, React Hook Form, Auth0, Java Spring Boot,
				Postgres
			</div>

			<ul class="mb-4 space-y-2">
				<li>
					Contributed to <strong>Loan Calculator features</strong> in React/TypeScript with form handling
					and validation using Zod + React Hook Form.
				</li>
				<li>Redux Toolkit for state management.</li>
				<li>BAU features for legacy React codebase.</li>
				<li>
					Worked on <strong>Auth0 integration</strong> and API integration with Java Spring Boot backend.
				</li>
			</ul>
		</article>

		<article class="mb-8">
			<h3 class="mb-2 text-lg font-semibold text-secondary">
				Lead Full-Stack Developer · Ingenovis Health
			</h3>
			<div class="mb-2 italic">Permanent · Sep 2021 — Jan 2025</div>
			<div class="mb-4 italic">
				Stack: React 18, Next.js (SSR) 14, Emotion + MUI (custom), Auth0, Contentful, Bullhorn
				(ATS), Python/FastAPI, Postgres, AWS (EKS), GitHub Actions, Monorepo (Rush), Capacitor
			</div>

			<p class="mb-4">
				Led the consolidation of multiple healthcare recruitment brands (Fastaff, USNursing,
				Trustaff) into a <strong>shared, themable platform</strong>, reducing duplication and
				enabling shared leads and recruiter resources.
			</p>
			<ul class="mb-4 space-y-2">
				<li>
					<strong>Designed & shipped</strong> a component library with per-brand theming; adopted across
					marketing, candidate and recruiter apps.
				</li>
				<li>
					Built a <strong>candidate portal</strong> (profile + job applications) and a
					<strong>recruiter app</strong> with RBAC, brand scoping and Bullhorn integration.
				</li>
				<li>
					Integrated <strong>Contentful</strong> via a custom content model; built a new Ingenovis marketing
					site with the design system.
				</li>
				<li>
					Re-engineered the portal + library to run as a <strong>Capacitor</strong> cross-platform app
					(iOS & Android).
				</li>
				<li>
					Created an <strong>interactive job-search map</strong> (customized Google Maps) and SSR pages
					for speed, SEO and analytics cleanliness.
				</li>
				<li>
					Set up Auth0, helped integrate CI/CD with GitHub Actions and AWS infra; ran guilds for
					consistency and shared standards.
				</li>
			</ul>
		</article>

		<article class="mb-8">
			<h3 class="mb-2 text-lg font-semibold text-secondary">
				Senior Full-Stack Developer · NAB (National Australia Bank)
			</h3>
			<div class="mb-2 italic">Permanent 2018 — 2021 · Contractor 2016 — 2018</div>
			<div class="mb-4 italic">
				Focus: Developer Platforms, API Design, Micro-frontends, GraphQL, OAuth, API Gateways
			</div>

			<ul class="mb-4 space-y-2">
				<li>
					Built a <strong>Next.js + TypeScript API portal</strong> for publishing docs, collaborating
					on models and promoting consistent API design.
				</li>
				<li>
					Architected a <strong>micro-frontend</strong> suite (4 React apps) with GraphQL services, an
					Express microservice and 3rd-party auth.
				</li>
				<li>
					Designed <strong>HATEOAS-style</strong> microservice APIs with OAuth for sandboxed client integrations.
				</li>
				<li>
					Created an <strong>AsyncAPI JSON-schema library</strong> + custom editor; added search across
					REST & event APIs.
				</li>
				<li>
					<span class="font-bold">NAB Connect:</span> led modernization of the business banking web platform.
				</li>
			</ul>
		</article>

		<article class="mb-8">
			<h3 class="mb-2 text-lg font-semibold text-secondary">
				Front-End Developer · Australian Financial Review (Fairfax Media)
			</h3>
			<div class="mb-4 italic">Permanent · 2014 — 2016</div>
			<ul class="mb-4 space-y-2">
				<li>
					Built a bespoke <strong>HTML pattern library</strong> (OOCSS), performance tuning and UX/user-testing
					loops.
				</li>
				<li>
					Set up CI/CD tasks for <strong>perceptual diff</strong> and <strong>accessibility</strong>
					testing; authored custom Node plugins.
				</li>
				<li>
					Designed and shipped marketing pages with measurable speed and accessibility improvements.
				</li>
			</ul>
		</article>
	</section>

	<aside class="col-span-3">
		<h2 class="mb-6 text-2xl font-semibold text-primary">Education & Certs</h2>
		<ul class="mb-4 space-y-2">
			<li>AWS Associate Developer (2020)</li>
			<li>Short Course, Digital Design — <em>Tractor</em> (2013–2014)</li>
			<li>Advanced Diploma of Graphic Design — <em>St George College of Design</em> (2007–2010)</li>
		</ul>

		<div class="mb-6 h-px bg-secondary opacity-25"></div>

		<h2 class="mb-6 text-xl font-semibold text-primary">Earlier Experience</h2>
		<article class="mb-4">
			<h3 class="mb-2 text-lg font-semibold">Front-End Developer · Cobe Design</h3>
			<div class="mb-2 italic">2012 — 2014</div>
		</article>

		<article class="mb-6">
			<h3 class="mb-2 text-lg font-semibold">Front-End Developer · Elastic Digital</h3>
			<div class="mb-2 italic">2009 — 2012</div>
		</article>
	</aside>
</div>

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
