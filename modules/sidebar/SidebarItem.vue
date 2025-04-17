<script setup lang="ts">
defineProps<{ isActive: boolean; title: string; href: string }>()
</script>

<template>
	<UButton
		:to="href"
		variant="ghost"
		:class="[isActive ? 'text-primary-500' : ' text-white']"
		icon="lucide:folder-plus"
		size="lg"
		>{{ title }}</UButton
	>
</template>

<style scoped></style>
