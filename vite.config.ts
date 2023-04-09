import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
		  '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap-scss'),
		  '~bootstrapIcons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
		}
	},
	server: {
		host: 'localhost',
		port: 4000
	}
});
