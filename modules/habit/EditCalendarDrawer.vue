<script setup lang="ts">
import type { Habit } from '~/types'
import { parseDate } from '@internationalized/date'

const props = defineProps<{ habit: Habit }>()

const dayDates = computed(() => props.habit.days.map(day => day.date))
const store = useHabitStore()

function getColorByDate(date: string) {
	if (dayDates.value.includes(date)) return props.habit.color
}
const minDate = parseDate(
	new Date(props.habit.createdAt).toISOString().split('T')[0]
)
const maxDate = parseDate(new Date().toISOString().split('T')[0])
const isLoading = ref(false)

const toggleComplete = async (date: string) => {
	isLoading.value = true
	if (
		new Date(props.habit.createdAt) <= new Date(date) &&
		new Date(date) <= new Date()
	) {
		await store.toggleCompletedByDate(props.habit.id, date)
	}
	isLoading.value = false
}

const anim = ref<null>(null)
</script>

<template>
	<UDrawer inset>
		<slot />
		<template #content>
			<div class="min-h-80 flex justify-center py-5">
				<UCalendar
					:min-value="minDate"
					:max-value="maxDate"
					:disabled="isLoading"
					size="xl"
					class="max-w-75"
					:ui="{
						cellTrigger:
							'rounded-lg data-[selected]:bg-transparent data-[selected]:text-white disabled:cursor-not-allowed',
					}"
				>
					<template #day="{ day }">
						<div
							class="relative"
							@click="toggleComplete(day.toDate('UTC').toDateString())"
						>
							<div
								class="rounded-full absolute -top-1 -right-1 size-1.5 flex items-center justify-center font-medium whitespace-nowrap"
								:show="!!getColorByDate(day.toDate('UTC').toDateString())"
								:style="{
									backgroundColor: getColorByDate(
										day.toDate('UTC').toDateString()
									),
								}"
								size="2xs"
							/>
							{{ day.day }}
						</div>
					</template>
				</UCalendar>
			</div>
			<UProgress
				v-model="anim"
				:class="[isLoading ? 'opacity-100' : 'opacity-0']"
			/>
		</template>
	</UDrawer>
</template>

<style scoped></style>
