<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'
import { registerSchema, type RegisterSchema } from './schemas/register.schema'
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth'

const state = reactive<Partial<RegisterSchema>>({
	email: '',
	password: '',
	passwordRepeat: '',
	name: '',
})
const auth = getAuth()

const isLoading = ref<boolean>(false)
const authStore = useAuthStore()
const router = useRouter()

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
	isLoading.value = true
	createUserWithEmailAndPassword(auth, event.data.email, event.data.password)
		.then(userCredential => {
			authStore.setUser({
				id: userCredential.user.uid,
				email: userCredential.user.email,
				displayName: userCredential.user.displayName,
			})
			toast.add({
				title: 'Аккаунт успешно создан',
				color: 'success',
			})
			router.replace(ROUTES.INDEX)
			console.log(userCredential)
			return userCredential
		})
		.then(userCredential => {
			updateProfile(userCredential.user, {
				displayName: event.data.name,
			})
			authStore.setDisplayName(event.data.name)
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
		:schema="registerSchema"
		:state="state"
		class="space-y-4 flex flex-col max-w-70 justify-center items-center"
		@submit="onSubmit"
	>
		<p class="text-center text-lg">Регистрация</p>

		<UFormField label="Ник" class="text-wrap" name="name">
			<UInput
				v-model="state.name"
				variant="soft"
				:loading="isLoading"
				size="lg"
				placeholder="John Sina"
				class="w-70"
			/>
		</UFormField>

		<UFormField label="Email" class="text-wrap" name="email">
			<UInput
				v-model="state.email"
				variant="soft"
				:loading="isLoading"
				size="lg"
				placeholder="john@lennon.com"
				class="w-70"
			/>
		</UFormField>

		<UFormField label="Пароль" name="password" class="text-wrap">
			<UInput
				v-model="state.password"
				variant="soft"
				class="w-70"
				:loading="isLoading"
				size="lg"
				type="password"
				placeholder="**********"
			/>
		</UFormField>

		<UFormField label="Повтор пароля" name="passwordRepeat" class="text-wrap">
			<UInput
				v-model="state.passwordRepeat"
				class="w-70"
				variant="soft"
				size="lg"
				type="password"
				:loading="isLoading"
				placeholder="**********"
			/>
		</UFormField>

		<UButton
			:loading="isLoading"
			type="submit"
			class="w-full text-center justify-center items-center"
		>
			Зарегистрироваться
		</UButton>

		<UButton
			:loading="isLoading"
			:to="ROUTES.AUTH.LOGIN"
			variant="link"
			class="w-full text-center justify-center items-center"
		>
			Войти в аккаунт
		</UButton>
	</UForm>
</template>
