<script setup lang="ts">
import type { Habit } from '~/types'
import DotList from './dot/DotList.vue'
import EditHabitModal from './EditHabitModal.vue'
import { habitDaysKey } from '~/lib/keys'

const props = defineProps<{ habit: Habit }>()

const injected = inject(habitDaysKey)
const store = useHabitStore()
const isLoading = ref<boolean>(false)

const onChangeCompleted = async () => {
	isLoading.value = true
	await store.toggleCompleted(props.habit.id)
	isLoading.value = false
}
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
			:loading="isLoading"
			:variant="injected?.todayDot.value?.isCompleted ? 'solid' : 'soft'"
			size="xl"
			class="z-20 absolute top-1.5 right-1.5"
			@click="onChangeCompleted"
		/>
	</div>
</template>
