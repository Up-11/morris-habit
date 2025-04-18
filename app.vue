<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'

useHead({
	titleTemplate: titleChunk => {
		return titleChunk ? `${titleChunk} - MorrisHabit` : 'MorrisHabit'
	},
	htmlAttrs: {
		lang: 'ru',
	},
})
</script>
<template>
	<UApp
		:locale="ru"
		:toaster="{
			position: 'top-center',
		}"
	>
		<AuthProvider>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</AuthProvider>
		<AppRouterTestVue />
	</UApp>
</template>
