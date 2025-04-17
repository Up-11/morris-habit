<script setup lang="ts">
const {
	color = '#FF9899',
	title = 'Пн',
	isCompleted,
} = defineProps<{
	title?: string
	isCurrentDay?: boolean
	isCompleted?: boolean
	color?: string
}>()
</script>

<template>
	<div class="flex flex-col justify-center cursor-default items-center gap-1">
		<p class="text-sm">{{ title }}</p>
		<div
			class="size-8 cursor-pointer transition-all border-neutral-500 flex items-center justify-center rounded-full"
			:class="[
				isCompleted ? '' : 'border-2',
				isCurrentDay && '!border-white border-2',
			]"
			:style="{ backgroundColor: isCompleted ? color : 'transparent' }"
		>
			<UIcon
				v-if="isCompleted"
				name="lucide:check"
				class="text-black"
				size="20"
			/>
		</div>
	</div>
</template>
