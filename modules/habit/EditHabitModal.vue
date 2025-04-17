<script setup lang="ts">
import type { Habit } from '~/types'
import ApproveModal from '../common/ApproveModal.vue'
import DotList from './dot/DotList.vue'
import EditCalendarDrawer from './EditCalendarDrawer.vue'
import UpdateHabitModal from './UpdateHabitModal.vue'

defineProps<{ habit: Habit }>()

const isCompleted = ref<boolean>(false)
const btnText = computed(() =>
	isCompleted.value ? 'Выполнено' : 'Не выполнено'
)
</script>

<template>
	<UModal
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />
		<template #title>
			<div class="flex gap-1 items-center text-lg">
				<UIcon :name="habit.icon" size="25" />
				<h2>{{ habit.title }}</h2>
			</div>
		</template>

		<template #body>
			<div class="flex flex-col gap-4">
				<DotList :color="habit.color" />
				<div class="flex justify-start gap-5">
					<UButton
						variant="ghost"
						:icon="isCompleted ? 'lucide:circle-check' : 'lucide:circle'"
						>{{ btnText }}</UButton
					>
					<ApproveModal
						title="Внимание!"
						description="Вы точно хотите отправить привычку в архив?"
						:buttons-text="['Отменить', 'Отправить']"
					>
						<UButton variant="ghost" icon="lucide:archive" />
					</ApproveModal>
					<UpdateHabitModal :habit="habit">
						<UButton variant="ghost" icon="lucide:pen" />
					</UpdateHabitModal>
					<EditCalendarDrawer>
						<UButton variant="ghost" icon="lucide:calendar" />
					</EditCalendarDrawer>
				</div>
			</div>
		</template>
	</UModal>
</template>
