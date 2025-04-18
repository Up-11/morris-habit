<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const schema = z.object({
	email: z.string().email('Неверный формат email'),
	password: z.string().min(8, 'Минимальная длина пароля 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
	email: '',
	password: '',
})

const auth = getAuth()

const isLoading = ref<boolean>(false)
const authStore = useAuthStore()
const router = useRouter()

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
	isLoading.value = true
	signInWithEmailAndPassword(auth, event.data.email, event.data.password)
		.then(userCredential => {
			authStore.setUser({
				id: userCredential.user.uid,
				email: userCredential.user.email,
				displayName: userCredential.user.displayName,
			})
			toast.add({
				title: 'Вы авторизованы',
				color: 'success',
			})
			router.replace(ROUTES.INDEX)
			console.log(userCredential)
		})
		.catch(error => {
			const errorMessage = error.message
			toast.add({
				title: errorMessage,
				color: 'error',
			})
		})
		.finally(() => (isLoading.value = false))
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="space-y-4 flex flex-col max-w-70 justify-center items-center"
		@submit="onSubmit"
	>
		<p class="text-center text-lg">Логин</p>

		<UFormField label="Email" class="text-wrap" name="email">
			<UInput
				v-model="state.email"
				variant="soft"
				size="lg"
				placeholder="john@lennon.com"
				class="w-70"
				:loading="isLoading"
			/>
		</UFormField>

		<UFormField label="Пароль" name="password" class="text-wrap">
			<UInput
				v-model="state.password"
				variant="soft"
				class="w-70"
				size="lg"
				type="password"
				placeholder="**********"
				:loading="isLoading"
			/>
		</UFormField>

		<UButton
			type="submit"
			class="text-center w-full justify-center items-center"
			:loading="isLoading"
		>
			Войти
		</UButton>

		<UButton
			:loading="isLoading"
			:to="ROUTES.AUTH.REGISTER"
			variant="link"
			class="text-center justify-center items-center"
			>Создать аккаунт</UButton
		>
	</UForm>
</template>
