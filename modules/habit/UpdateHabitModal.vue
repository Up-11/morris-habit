<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { appColors, appIcons } from '~/lib/data'
import IconItem from '../common/IconItem.vue'
import ColorItem from '../common/ColorItem.vue'
import type { Habit } from '~/types'

const schema = z.object({
	title: z.string(),
	icon: z.string(),
	color: z.string(),
})

const props = defineProps<{ habit: Habit }>()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	title: props.habit.title,
	icon: props.habit.icon,
	color: props.habit.color,
})
const isLoading = ref<boolean>(false)

const isOpen = ref<boolean>(false)
const store = useHabitStore()

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		isLoading.value = true
		await store.updateHabit({
			id: props.habit.id,
			title: event.data.title,
			icon: event.data.icon,
			color: event.data.color,
		})
		toast.add({
			title: 'Привычка обновлена',
			color: 'success',
		})
		isOpen.value = false
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		toast.add({
			title: 'Ошибка при обновлении привычки',
			description: error.message,
			color: 'error',
		})
	} finally {
		isLoading.value = false
		store.getHabits()
	}
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
					Обновить
				</UButton>
			</UForm>
		</template>
	</UModal>
</template>
