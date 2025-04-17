<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import { habits } from '~/lib/data'
import CreateHabitModal from '~/modules/habit/CreateHabitModal.vue'
import DefaultHabit from '~/modules/habit/DefaultHabit.vue'
import WeekHabit from '~/modules/habit/WeekHabit.vue'

type View = 'week' | 'common'

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
const router = useRouter()

onMounted(() => {
	currValue.value = router.currentRoute.value.query.view as View
})

watch(currValue, () => {
	router.push({ query: { view: currValue.value } })
})
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
				:content="false"
				:items="items"
				class="max-w-40 w-full"
			/>
		</div>
		<div v-if="currValue === 'common'" class="grid grid-cols-3 gap-4">
			<DefaultHabit v-for="habit in habits" :key="habit.id" :habit="habit" />
		</div>
		<div v-if="currValue === 'week'" class="grid grid-cols-3 gap-4">
			<WeekHabit />
		</div>
	</section>
</template>

<style scoped></style>
