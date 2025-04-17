<script setup lang="ts">
import type { Habit } from '~/types'
import { parseDate } from '@internationalized/date'

const props = defineProps<{ habit: Habit }>()

const dayDates = props.habit.days.map(day => day.date)

function getColorByDate(date: string) {
	if (dayDates.includes(date)) return props.habit.color
}
const minDate = parseDate(
	new Date(props.habit.createdAt).toISOString().split('T')[0]
)
const maxDate = parseDate(new Date().toISOString().split('T')[0])
</script>

<template>
	<UDrawer inset>
		<slot />
		<template #content>
			<div class="min-h-80 flex justify-center py-5">
				<UCalendar
					:min-value="minDate"
					:max-value="maxDate"
					size="xl"
					class="max-w-75"
					:ui="{
						cellTrigger:
							'rounded-lg data-[selected]:bg-transparent data-[selected]:text-white',
					}"
				>
					<template #day="{ day }">
						<div
							class="relative"
							@click="
								() => console.log(day.toDate('UTC').toISOString().split('T')[0])
							"
						>
							<div
								class="rounded-full absolute -top-1 -right-1 size-1.5 flex items-center justify-center font-medium whitespace-nowrap"
								:show="
									!!getColorByDate(
										day.toDate('UTC').toISOString().split('T')[0]
									)
								"
								:style="{
									backgroundColor: getColorByDate(
										day.toDate('UTC').toISOString().split('T')[0]
									),
								}"
								size="2xs"
							/>
							{{ day.day }}
						</div>
					</template>
				</UCalendar>
			</div>
		</template>
	</UDrawer>
</template>

<style scoped></style>
