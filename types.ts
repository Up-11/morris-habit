export type User = {
	id: string
	email: string
	displayName: string
}

export type Habit = {
	id: string
	title: string
	createdAt: string
	icon: string
	color: string
	days: HabitDay[]
	isArchived: boolean
}

export type HabitDay = {
	id: string
	habitId: string
	date: string
	completed: boolean
}
