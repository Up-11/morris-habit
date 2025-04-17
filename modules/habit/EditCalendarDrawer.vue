<script setup lang="ts">
function getColorByDate(date: Date) {
	const isWeekend = date.getDay() % 6 == 0
	const isDayMeeting = date.getDay() % 3 == 0

	if (isWeekend) {
		return undefined
	}

	if (isDayMeeting) {
		return 'error'
	}

	return 'success'
}
</script>

<template>
	<UDrawer inset>
		<slot />
		<template #content>
			<div class="min-h-80 flex justify-center py-5">
				<UCalendar
					size="xl"
					class="max-w-75"
					:ui="{ cellTrigger: 'rounded-lg' }"
				>
					<template #day="{ day }">
						<div @click="() => console.log(day)">
							<UChip
								:show="!!getColorByDate(day.toDate('UTC'))"
								:color="getColorByDate(day.toDate('UTC'))"
								size="2xs"
							>
								{{ day.day }}
							</UChip>
						</div>
					</template>
				</UCalendar>
			</div>
		</template>
	</UDrawer>
</template>

<style scoped></style>
