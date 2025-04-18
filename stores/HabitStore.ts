import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore'
import type { Habit, HabitDay } from '~/types'

export const useHabitStore = defineStore('HabitStore', () => {
	const habits = ref<Habit[]>([])
	const isLoading = ref<boolean>(false)
	const user = getAuth().currentUser
	const db = getFirestore()
	const toast = useToast()
	const auth = useAuthStore()

	const notArchivedHabits = computed(() =>
		habits.value.filter(habit => habit.isArchived === false)
	)
	const archivedHabits = computed(() =>
		habits.value.filter(habit => habit.isArchived)
	)

	const updateHabit = async (dto: {
		id: string
		title: string
		icon: string
		color: string
	}) => {
		const payload: Partial<Habit> = {
			title: dto.title,
			icon: dto.icon,
			color: dto.color,
		}

		const docRef = doc(db, `users/${user!.uid}/habits/${dto.id}`)
		await updateDoc(docRef, payload)
	}

	async function getHabits() {
		if (auth.user.id === null) return
		try {
			const getData = query(
				collection(db, `users/${user!.uid}/habits`),
				orderBy('createdAt', 'desc')
			)
			const listDocs = await getDocs(getData)

			habits.value = listDocs.docs.map(doc => doc.data() as Habit)
		} catch (error) {
			console.log(error)
		}
	}

	const archiveHabit = async (id: string) => {
		const docRef = doc(db, `users/${user!.uid}/habits/${id}`)
		await updateDoc(docRef, { isArchived: true })
			.then(() => {
				toast.add({
					title: 'Привычка архивирована',
					color: 'success',
				})
			})
			.finally(() => {
				getHabits()
			})
	}
	const unArchiveHabit = async (id: string) => {
		const docRef = doc(db, `users/${user!.uid}/habits/${id}`)
		await updateDoc(docRef, { isArchived: false })
			.then(() => {
				toast.add({
					title: 'Привычка разархивирована',
					color: 'success',
				})
			})
			.finally(() => {
				getHabits()
			})
	}
	const deleteHabit = async (id: string) => {
		const docRef = doc(db, `users/${user!.uid}/habits/${id}`)
		await deleteDoc(docRef)
			.then(() => {
				toast.add({
					title: 'Привычка удалена',
					color: 'success',
				})
			})
			.finally(() => {
				getHabits()
			})
	}
	const toggleCompleted = async (habitId: string) => {
		try {
			const habitDocRef = doc(db, `users/${user!.uid}/habits/${habitId}`)
			const habitDoc = await getDoc(habitDocRef)
			const habitData = habitDoc.data() as Habit

			const today = new Date().toDateString()
			const updatedDays: HabitDay[] = [...habitData.days]

			const existingDayIndex = updatedDays.findIndex(
				day => day.date === today && day.habitId === habitId
			)

			if (existingDayIndex !== -1) {
				updatedDays.splice(existingDayIndex, 1)
			} else {
				updatedDays.push({
					id: `${habitId}-${today}`,
					habitId: habitId,
					date: today,
					completed: true,
				})
			}

			await updateDoc(habitDocRef, {
				days: updatedDays,
			})

			await getHabits()
		} catch (error) {
			toast.add({
				title: 'Ошибка при изменении статуса привычки',
				description:
					error instanceof Error ? error.message : 'Неизвестная ошибка',
				color: 'error',
			})
		}
	}
	const toggleCompletedByDate = async (habitId: string, date: string) => {
		try {
			const habitDocRef = doc(db, `users/${user!.uid}/habits/${habitId}`)
			const habitDoc = await getDoc(habitDocRef)
			const habitData = habitDoc.data() as Habit

			const updatedDays: HabitDay[] = [...habitData.days]
			const targetDate = date

			const existingDayIndex = updatedDays.findIndex(
				day => day.date === targetDate && day.habitId === habitId
			)

			if (existingDayIndex !== -1) {
				updatedDays.splice(existingDayIndex, 1)
			} else {
				updatedDays.push({
					id: `${habitId}-${targetDate}`,
					habitId: habitId,
					date: targetDate,
					completed: true,
				})
			}

			await updateDoc(habitDocRef, {
				days: updatedDays,
			})

			await getHabits()
		} catch (error) {
			console.error('Error toggling habit completion by date:', error)
			toast.add({
				title: 'Ошибка при изменении статуса привычки',
				description:
					error instanceof Error ? error.message : 'Неизвестная ошибка',
				color: 'error',
			})
		}
	}

	onMounted(async () => {
		isLoading.value = true
		await getHabits()
		isLoading.value = false
	})

	return {
		getHabits,
		habits,
		isLoading,
		notArchivedHabits,
		archivedHabits,
		updateHabit,
		archiveHabit,
		unArchiveHabit,
		deleteHabit,
		toggleCompleted,
		toggleCompletedByDate,
	}
})
