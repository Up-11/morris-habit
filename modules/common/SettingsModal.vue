<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { getAuth, updateProfile } from 'firebase/auth'
import { z } from 'zod'

const _schema = z.object({
	displayName: z.string(),
})

type Schema = z.output<typeof _schema>

const store = useAuthStore()

const isOpen = ref(false)
const toast = useToast()
const isLoading = ref(false)
const user = getAuth().currentUser

const state = reactive<Partial<Schema>>({
	displayName: store.user?.displayName || '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		isLoading.value = true

		toast.add({
			title: 'Никнейм обновлен',
			color: 'success',
		})
		await updateProfile(user!, {
			displayName: event.data.displayName,
		})
		store.setDisplayName(event.data.displayName)
		isOpen.value = false
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		toast.add({
			title: 'Ошибка при смене никнейма',
			description: error.message,
			color: 'error',
		})
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<UModal
		v-model:open="isOpen"
		title="Редактирование профиля"
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />

		<template #body>
			<UForm
				:schema="_schema"
				:state="state"
				class="space-y-4"
				@submit="onSubmit"
			>
				<UFormField label="Никнейм" name="displayName">
					<UInput v-model="state.displayName" class="w-full" size="xl" />
				</UFormField>

				<UButton :loading="isLoading" type="submit" size="xl">
					Обновить
				</UButton>
			</UForm>
		</template>
	</UModal>
</template>
