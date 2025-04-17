<script setup lang="ts">
defineProps<{ icon: string; isActive: boolean }>()
defineEmits<{
	click: []
}>()
</script>

<template>
	<UButton
		:icon="icon"
		:ui="{
			leadingIcon: '!size-6',
		}"
		color="neutral"
		variant="ghost"
		size="xl"
		class="border-2 border-transparent"
		:class="[isActive && 'border-2 border-white']"
		@click="$emit('click')"
	/>
</template>

<style scoped></style>
