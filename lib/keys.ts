import type { HabitDot } from '~/types'

export const habitDaysKey = Symbol() as InjectionKey<{
	weeks: ComputedRef<HabitDot[][]>
	days: Ref<HabitDot[]>
	todayDot: ComputedRef<HabitDot | undefined>
}>
