<script setup lang="ts">
import type { VNodeRef } from 'vue'
import DotItem from './DotItem.vue'

defineProps<{ color: string }>()

const container = ref<VNodeRef | null>(null)

const scrollToEnd = () => {
	if (!container.value) return
	container.value.scrollLeft = container.value.scrollWidth
}

onMounted(() => {
	nextTick(scrollToEnd)
})
</script>

<template>
	<div
		ref="container"
		class="h-full grid grid-rows-7 gap-1 grid-cols-auto overflow-x-auto"
	>
		<template v-for="col in 50" :key="col">
			<DotItem
				v-for="row in 7"
				:key="row"
				in-range
				is-completed
				:color="color"
				:style="{
					'grid-column': col,
					'grid-row': row,
				}"
			/>
		</template>
	</div>
</template>

<style scoped></style>
