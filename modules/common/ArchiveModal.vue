<script setup lang="ts">
import ArchivedHabit from '../habit/ArchivedHabit.vue'

const store = useHabitStore()

const isOpen = ref<boolean>(false)
const closeModal = () => {
	isOpen.value = false
}
</script>

<template>
	<UModal
		v-model:open="isOpen"
		title="Архив"
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />

		<template #body>
			<div class="flex flex-col gap-4">
				<ArchivedHabit
					v-for="habit in store.archivedHabits"
					:key="habit.id"
					:habit="habit"
					@close-modal="closeModal"
				/>
			</div>
			<div v-if="store.archivedHabits.length === 0">
				<h1 class="text-xl text-center font-bold">
					У вас в архиве пустовато...
				</h1>
			</div>
		</template>
	</UModal>
</template>
