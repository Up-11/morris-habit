<script setup lang="ts">
const {
	color = '#FF9899',
	inRange,
	isCompleted,
} = defineProps<{
	isCompleted?: boolean
	isCurrentDay?: boolean
	color?: string
	inRange?: boolean
}>()

const computedOpacity = computed(() =>
	inRange ? (isCompleted ? 1 : 0.4) : 0.1
)
</script>

<template>
	<div
		class="size-3.5 rounded-full transition-colors"
		:class="[isCurrentDay && '!border-white border-2']"
		:style="{
			backgroundColor: color,
			opacity: computedOpacity,
		}"
	/>
</template>

<style scoped></style>
