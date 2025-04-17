<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ROUTES } from '~/config/routes'

const schema = z.object({
	email: z.string().email('Неверный формат email'),
	password: z.string().min(8, 'Минимальная длина пароля 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	email: '',
	password: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
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
		:schema="schema"
		:state="state"
		class="space-y-4 flex flex-col max-w-70 justify-center items-center"
		@submit="onSubmit"
	>
		<p class="text-center text-lg">Регистрация</p>

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

		<UButton
			type="submit"
			class="text-center w-full justify-center items-center"
		>
			Войти
		</UButton>

		<UButton
			:to="ROUTES.AUTH.REGISTER"
			variant="link"
			class="text-center justify-center items-center"
			>Создать аккаунт</UButton
		>
	</UForm>
</template>
