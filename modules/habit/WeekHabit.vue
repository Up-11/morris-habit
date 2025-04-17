<script setup lang="ts">
import type { Habit } from '~/types'
import WeekDayItem from './WeekDayItem.vue'
import { habitDaysKey } from '~/lib/keys'

defineProps<{ habit: Habit }>()

const injected = inject(habitDaysKey)

const lastWeek = injected?.weeks.value.at(-1)
</script>

<template>
	<div class="flex flex-col cursor-pointer bg-neutral-800 rounded-lg p-2">
		<div
			class="flex-1 border-b border-b-neutral-700 pb-2 flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<UIcon :name="habit.icon" size="20" />
				<p>{{ habit.title }}</p>
			</div>

			<UButton icon="lucide:check" variant="soft" size="xl" />
		</div>
		<div class="flex-1 pt-2 flex justify-between gap-1">
			<WeekDayItem
				v-for="day in lastWeek"
				:key="day.date"
				:is-completed="day.isCompleted"
				:is-current-day="day.isCurrentDay"
				:date="day.date"
				:color="habit.color"
			/>
			<!-- <WeekDayItem s-active title="Вт" is-current-day />
			<WeekDayItem s-active title="Ср" />
			<WeekDayItem is-active title="Чт" />
			<WeekDayItem is-active title="Пт" />
			<WeekDayItem is-active title="Сб" />
			<WeekDayItem s-active title="Вс" /> -->
		</div>
	</div>
</template>
