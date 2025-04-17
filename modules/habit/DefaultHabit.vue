<script setup lang="ts">
import type { Habit } from '~/types'
import DotList from './dot/DotList.vue'
import EditHabitModal from './EditHabitModal.vue'

defineProps<{ habit: Habit }>()
</script>
<template>
	<div class="relative">
		<EditHabitModal :habit="habit">
			<div class="flex flex-col cursor-pointer bg-neutral-800 rounded-lg p-2">
				<div
					class="flex-1 border-b border-b-neutral-700 pb-2 flex justify-between items-center"
				>
					<div class="flex items-center gap-2">
						<UIcon :name="habit.icon" size="20" />
						<p>{{ habit.title }}</p>
					</div>
				</div>
				<DotList :color="habit.color" class="pt-2" />
			</div>
		</EditHabitModal>
		<UButton
			icon="lucide:check"
			variant="soft"
			size="xl"
			class="z-20 absolute top-1.5 right-1.5"
		/>
	</div>
</template>
