<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { appColors, appIcons } from '~/lib/data'
import IconItem from '../common/IconItem.vue'
import ColorItem from '../common/ColorItem.vue'
import type { Habit } from '~/types'
import { v4 as uuidv4 } from 'uuid'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

const schema = z.object({
	title: z.string(),
	icon: z.string(),
	color: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	title: 'Новая привычка',
	icon: appIcons[0],
	color: appColors[0],
})
const db = getFirestore()
const { user } = useAuthStore()
const isLoading = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const store = useHabitStore()

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
	isLoading.value = true
	const payload: Habit = {
		id: uuidv4(),
		title: event.data.title,
		icon: event.data.icon,
		color: event.data.color,
		isArchived: false,
		createdAt: new Date().toDateString(),
		days: [],
	}
	await setDoc(doc(db, `users/${user.id}/habits/${payload.id}`), payload)
	store.getHabits()
	toast.add({
		title: 'Привычка создана',
		color: 'success',
	})
	isLoading.value = false
	isOpen.value = false
}
</script>

<template>
	<UModal
		v-model:open="isOpen"
		title="Новая привычка"
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />

		<template #body>
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4"
				@submit="onSubmit"
			>
				<UFormField label="Название" name="title">
					<UInput v-model="state.title" class="w-full" size="xl" />
				</UFormField>
				<UFormField label="Иконка" name="icon">
					<div class="flex flex-wrap">
						<IconItem
							v-for="icon in appIcons"
							:key="icon"
							:icon="icon"
							:is-active="icon === state.icon"
							class="m-1"
							@click="state.icon = icon"
						/>
					</div>
				</UFormField>
				<UFormField label="Цвет" name="color">
					<div class="flex flex-wrap">
						<ColorItem
							v-for="color in appColors"
							:key="color"
							:color="color"
							:is-active="color === state.color"
							class="m-1"
							@click="state.color = color"
						/>
					</div>
				</UFormField>

				<UButton :loading="isLoading" type="submit" size="xl">
					Создать
				</UButton>
			</UForm>
		</template>
	</UModal>
</template>
