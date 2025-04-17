import type { Habit, HabitDot } from '~/types'

export const useHabitDays = (habit: Habit) => {
	const startDate = new Date('2024-12-31')
	const today = new Date()

	startDate.setHours(0, 0, 0, 0)
	today.setHours(0, 0, 0, 0)

	const allDays: HabitDot[] = []
	const currentDate = new Date(startDate)

	const firstMonday = new Date(startDate)
	while (firstMonday.getDay() !== 1) {
		firstMonday.setDate(firstMonday.getDate() + 1)
	}

	while (currentDate <= today) {
		const currentDay = new Date(currentDate)
		currentDay.setHours(0, 0, 0, 0)

		allDays.push({
			date: currentDay.toISOString().split('T')[0],
			inRange: currentDay > new Date(habit.createdAt),
			isCompleted: habit.days.some(
				day => day.date === currentDay.toISOString().split('T')[0]
			),
			isCurrentDay:
				currentDay.toISOString().split('T')[0] ===
				today.toISOString().split('T')[0],
		})

		currentDate.setDate(currentDate.getDate() + 1)
	}

	const daysToAdd = 7 - (allDays.length % 7)
	if (daysToAdd < 7) {
		for (let i = 0; i < daysToAdd; i++) {
			const emptyDay = new Date(today)
			emptyDay.setDate(today.getDate() + i + 1)
			emptyDay.setHours(0, 0, 0, 0)

			allDays.push({
				date: emptyDay.toISOString().split('T')[0],
				inRange: false,
				isCompleted: false,
				isCurrentDay: false,
			})
		}
	}

	const days = ref(allDays)
	const weeks = computed(() => {
		const weeks = []
		for (let i = 0; i < days.value.length; i += 7) {
			weeks.push(days.value.slice(i, i + 7))
		}
		return weeks
	})

	return {
		weeks,
		days,
	}
}
