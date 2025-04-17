<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'
import { registerSchema, type RegisterSchema } from './schemas/register.schema'

const state = reactive<Partial<RegisterSchema>>({
	email: '',
	password: '',
	passwordRepeat: '',
	name: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
	toast.add({
		title: 'Success',
		description: 'The form has been submitted.',
		color: 'success',
	})
	console.log(event.data)
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
				size="lg"
				placeholder="John Sina"
				class="w-70"
			/>
		</UFormField>

		<UFormField label="Email" class="text-wrap" name="email">
			<UInput
				v-model="state.email"
				variant="soft"
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
				placeholder="**********"
			/>
		</UFormField>

		<UButton
			type="submit"
			class="w-full text-center justify-center items-center"
		>
			Зарегистрироваться
		</UButton>

		<UButton
			:to="ROUTES.AUTH.LOGIN"
			variant="link"
			class="w-full text-center justify-center items-center"
		>
			Войти в аккаунт
		</UButton>
	</UForm>
</template>
