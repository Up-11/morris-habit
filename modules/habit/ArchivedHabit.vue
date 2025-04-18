<script setup lang="ts">
import type { Habit } from '~/types'

const props = defineProps<{ habit: Habit }>()
const store = useHabitStore()
const emit = defineEmits<{ closeModal: [] }>()

const deleteHabit = () => {
	store.deleteHabit(props.habit.id)
	emit('closeModal')
}
const unArchiveHabit = () => {
	store.unArchiveHabit(props.habit.id)
	emit('closeModal')
}
</script>

<template>
	<div class="flex flex-col gap-1 bg-neutral-800 rounded-lg p-4">
		<div class="flex justify-start gap-1 items-center">
			<UIcon :name="habit.icon" size="19" />
			<p class="text-lg">{{ habit.title }}</p>
		</div>
		<div class="flex justify-end gap-1">
			<UButton variant="link" @click="deleteHabit">Удалить навсегда</UButton>
			<UButton @click="unArchiveHabit">Восстановить</UButton>
		</div>
	</div>
</template>

<style scoped></style>
