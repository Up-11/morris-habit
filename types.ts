export type User = {
	id: string | null
	email: string | null
	displayName: string | null
}

export type View = 'week' | 'common'

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

export type HabitDot = {
	date: string
	inRange: boolean
	isCompleted: boolean
	isCurrentDay: boolean
}
