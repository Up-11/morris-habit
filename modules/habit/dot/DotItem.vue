<script setup lang="ts">
import type { HabitDot } from '~/types'

const {
	color = '#FF9899',
	inRange,
	isCompleted,
} = defineProps<
	{
		color?: string
	} & HabitDot
>()

const computedOpacity = computed(() =>
	inRange ? (isCompleted ? 1 : 0.4) : 0.1
)
</script>

<template>
	<div
		class="size-3.5 rounded transition-colors"
		:class="[isCurrentDay && '!border-white border-2']"
		:style="{
			backgroundColor: color,
			opacity: computedOpacity,
		}"
		@click="console.log(date)"
	/>
</template>

<style scoped></style>
