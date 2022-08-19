import adapter from '@sveltejs/adapter-static';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
      		assets: 'docs',
			fallback:'200.html'
		}),
		trailingSlash: 'always',
	},
	preprocess: [
		preprocess({
		  postcss: true,
		}),
	  ],


	
};

export default config;
