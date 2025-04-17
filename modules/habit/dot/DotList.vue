<script setup lang="ts">
import type { VNodeRef } from 'vue'
import DotItem from './DotItem.vue'
import { habitDaysKey } from '~/lib/keys'

defineProps<{ color: string }>()

const container = ref<VNodeRef | null>(null)

const scrollToEnd = () => {
	if (!container.value) return
	container.value.scrollLeft = container.value.scrollWidth
}

onMounted(() => {
	nextTick(scrollToEnd)
})

const injected = inject(habitDaysKey)
</script>

<template>
	<div
		ref="container"
		class="h-full grid grid-rows-7 gap-1 grid-cols-auto overflow-x-auto max-w-fit"
	>
		<template v-for="(week, i) in injected!.weeks.value" :key="week">
			<DotItem
				v-for="(day, index) in week"
				:key="day.date"
				:in-range="day.inRange"
				:is-current-day="day.isCurrentDay"
				:is-completed="day.isCompleted"
				:color="color"
				:date="day.date"
				:style="{
					'grid-column': i + 1,
					'grid-row': index + 1,
				}"
			/>
		</template>
	</div>
</template>

<style scoped></style>
