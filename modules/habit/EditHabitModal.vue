<script setup lang="ts">
import type { Habit } from '~/types'
import ApproveModal from '../common/ApproveModal.vue'
import DotList from './dot/DotList.vue'
import EditCalendarDrawer from './EditCalendarDrawer.vue'
import UpdateHabitModal from './UpdateHabitModal.vue'
import { habitDaysKey } from '~/lib/keys'

const props = defineProps<{ habit: Habit }>()

const btnText = computed(() =>
	injected?.todayDot.value?.isCompleted ? 'Выполнено' : 'Не выполнено'
)

const store = useHabitStore()

const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const closeModal = () => {
	isOpen.value = false
}

const onClickApprove = async () => {
	await store.archiveHabit(props.habit.id)
	closeModal()
}

const injected = inject(habitDaysKey)

const onChangeCompleted = async () => {
	isLoading.value = true
	await store.toggleCompleted(props.habit.id)
	isLoading.value = false
}
</script>

<template>
	<UModal
		v-model:open="isOpen"
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
						:loading="isLoading"
						:variant="injected?.todayDot.value?.isCompleted ? 'solid' : 'soft'"
						:icon="
							injected?.todayDot.value?.isCompleted
								? 'lucide:circle-check'
								: 'lucide:circle'
						"
						@click="onChangeCompleted"
						>{{ btnText }}</UButton
					>
					<ApproveModal
						title="Внимание!"
						description="Вы точно хотите отправить привычку в архив?"
						:buttons-text="['Отменить', 'Отправить']"
						@approve="onClickApprove"
					>
						<UButton variant="ghost" icon="lucide:archive" />
					</ApproveModal>
					<UpdateHabitModal :habit="habit">
						<UButton variant="ghost" icon="lucide:pen" />
					</UpdateHabitModal>
					<EditCalendarDrawer :habit="habit">
						<UButton variant="ghost" icon="lucide:calendar" />
					</EditCalendarDrawer>
				</div>
			</div>
		</template>
	</UModal>
</template>
