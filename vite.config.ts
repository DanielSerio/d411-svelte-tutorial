import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		// svelte-codemirror-editor
		exclude: [
			'codemirror',
			'@codemirror/lang-javascript',
			'@codemirror/lang-sass',
			'@replit/codemirror-lang-svelte',
			'@codemirror/theme-one-dark',
			'@codemirror/lang-html',
			'@codemirror/view',
			'@codemirror/state',
			'@codemirror/commands',
			'@codemirror/language'
		]
	}
});
