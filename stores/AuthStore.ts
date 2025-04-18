import { defineStore } from 'pinia'
import type { User } from '~/types'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ROUTES } from '~/config/routes'
import { initialUser } from '~/lib/data'

export const useAuthStore = defineStore('AuthStore', () => {
	const user = ref(initialUser)
	const isAuthenticated = computed(() => user.value.id !== null)
	const auth = getAuth()
	const toast = useToast()
	const router = useRouter()
	const isLoading = ref<boolean>(true)

	const setUser = (newUser: User) => {
		localStorage.setItem('user', JSON.stringify(user))
		user.value = newUser
	}

	onMounted(() => {
		onAuthStateChanged(auth, usr => {
			if (usr) {
				setUser({
					id: usr.uid,
					displayName: usr.displayName,
					email: usr.email,
				})
				isLoading.value = false
				router.replace(ROUTES.INDEX)
			} else {
				localStorage.removeItem('user')
				router.replace(ROUTES.AUTH.LOGIN)
				isLoading.value = false
			}
		})
	})

	const setDisplayName = (displayName: string) => {
		user.value.displayName = displayName
	}
	const logout = async () => {
		try {
			await signOut(auth)
			localStorage.removeItem('user')
			user.value = initialUser
			toast.add({
				title: 'Вы вышли из аккаунта',
				color: 'success',
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.add({
				title: 'Ошибка выхода из аккаунта',
				description: error.message,
				color: 'success',
			})
		}
	}
	return {
		user,
		isAuthenticated,
		logout,
		setUser,
		setDisplayName,
		isLoading,
	}
})
