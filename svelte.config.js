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
		adapter: adapter(),
		prerender: {
			entries: ['*']
		}
	},

	extensions: ['.svelte']
};

export default config;
