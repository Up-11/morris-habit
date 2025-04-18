import type { Habit, HabitDot } from '~/types'

export const useHabitDays = (habit: Habit) => {
	const startDate = new Date('2025-01-01')
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	console.log(new Date(habit.createdAt))

	const allDays: HabitDot[] = []

	const firstMonday = new Date(startDate)
	while (firstMonday.getDay() !== 1) {
		firstMonday.setDate(firstMonday.getDate() + 1)
	}
	const currentDate = new Date(firstMonday)

	currentDate.setHours(0, 0, 0, 0)
	while (currentDate <= today) {
		allDays.push({
			date: currentDate.toDateString(),
			inRange: currentDate >= new Date(habit.createdAt),
			isCompleted: habit.days.some(
				day => day.date === currentDate.toDateString()
			),
			isCurrentDay: currentDate.getTime() === today.getTime(),
		})
		currentDate.setDate(currentDate.getDate() + 1)
	}
	const days = ref(allDays)

	const weeks = computed(() => {
		const weeksArray = []
		let i = 0
		while (i < days.value.length) {
			weeksArray.push(days.value.slice(i, i + 7))
			i += 7
		}
		return weeksArray
	})

	if (weeks.value.length > 0) {
		const lastWeek = weeks.value[weeks.value.length - 1]
		const daysToAdd = 7 - lastWeek.length
		if (daysToAdd > 0) {
			for (let i = 0; i < daysToAdd; i++) {
				const emptyDay = new Date(today)
				emptyDay.setDate(today.getDate() + i + 1)
				emptyDay.setHours(0, 0, 0, 0)

				days.value.push({
					date: emptyDay.toDateString(),
					inRange: false,
					isCompleted: false,
					isCurrentDay: false,
				})
			}
		}
	}

	const todayDot = computed(() => {
		return days.value.find(day => day.date === today.toDateString())
	})

	return {
		weeks,
		days,
		todayDot,
	}
}
