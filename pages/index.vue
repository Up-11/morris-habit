<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'

import CreateHabitModal from '~/modules/habit/CreateHabitModal.vue'
import HabitItem from '~/modules/habit/HabitItem.vue'
import type { View } from '~/types'

const items = ref<TabsItem[]>([
	{
		label: 'Общий',
		value: 'common' as View,
	},
	{
		label: 'Неделя',
		value: 'week' as View,
	},
])

const currValue = ref<View>('common')
const habitStore = useHabitStore()
onMounted(() => {
	const savedView = localStorage.getItem('currentView') as View
	if (savedView) {
		currValue.value = savedView
	} else {
		currValue.value = 'common'
	}
})

watch(
	currValue,
	newView => {
		localStorage.setItem('currentView', newView)
	},
	{ deep: true }
)
</script>

<template>
	<section class="flex flex-col gap-4">
		<div class="flex justify-start items-center gap-2">
			<h1 class="font-semibold text-2xl">Добавить привычку на экран</h1>
			<CreateHabitModal>
				<UButton icon="lucide:plus" variant="ghost" size="xl" />
			</CreateHabitModal>
		</div>
		<div class="flex justify-start items-center gap-2">
			<h2 class="font-semibold text-xl">Отображение</h2>
			<UTabs
				v-model="currValue"
				:unmount-on-hide="false"
				:content="false"
				:items="items"
				class="max-w-40 w-full"
			/>
		</div>
		<div v-if="habitStore.isLoading" class="grid grid-cols-4 gap-4">
			<USkeleton v-for="i in 12" :key="i" class="h-40" />
		</div>

		<div
			v-else
			class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
		>
			<HabitItem
				v-for="habit in habitStore.notArchivedHabits"
				:key="habit.id"
				:view="currValue"
				:habit="habit"
			/>
		</div>
		<div v-if="habitStore.notArchivedHabits.length === 0">
			<h1 class="text-2xl text-center font-bold">
				Тут пока ничего нет, добавьте свою привычку на экран
			</h1>
		</div>
	</section>
</template>

<style scoped></style>
