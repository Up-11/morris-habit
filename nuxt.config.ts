import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	vite: {
		plugins: [tailwindcss()],
	},
	css: ['~/assets/css/main.css'],

	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/ui',
		'@pinia/nuxt',
	],
	fonts: {
		families: [{ name: 'Rubik', provider: 'google' }],
	},
	ssr: false,
})
