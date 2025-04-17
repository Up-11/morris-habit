<script setup lang="ts">
import { habits } from '~/lib/data'
import ArchivedHabit from '../habit/ArchivedHabit.vue'

const archivedHabits = computed(() => habits.filter(habit => habit.isArchived))
</script>

<template>
	<UModal
		title="Архив"
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />

		<template #body>
			<div class="flex flex-col gap-4">
				<ArchivedHabit
					v-for="habit in archivedHabits"
					:key="habit.id"
					:habit="habit"
				/>
			</div>
		</template>
	</UModal>
</template>
