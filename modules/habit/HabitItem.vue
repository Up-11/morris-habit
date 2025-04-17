<script setup lang="ts">
import type { Habit, View } from '~/types'
import DefaultHabit from './DefaultHabit.vue'
import WeekHabit from './WeekHabit.vue'
import { habitDaysKey } from '~/lib/keys'

const props = defineProps<{ view: View; habit: Habit }>()

const { weeks, days } = useHabitDays(props.habit)

provide(habitDaysKey, { weeks, days })
</script>

<template>
	<div>
		<DefaultHabit v-if="view === 'common'" :habit="habit" />
		<WeekHabit v-else :habit="habit" />
	</div>
</template>

<style scoped></style>
