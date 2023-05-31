import type { StorybookConfig } from '@storybook/sveltekit';
const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../src/**/*.stories.svelte'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
		{
			name: '@storybook/addon-styling',
			options: {
				sass: {
				  implementation: require('sass'),
				},
			},
		}
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	core: {
		builder: '@storybook/builder-vite',
	}
};
export default config;
