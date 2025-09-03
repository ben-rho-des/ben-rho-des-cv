import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
			preprocess: [
			vitePreprocess()
		],

	kit: { 
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleHttpError: 'warn',
			handleUnseenRoutes: 'warn'
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/ben-rho-des-cv' : ''
		}
	},

	extensions: ['.svelte']
};

export default config;
