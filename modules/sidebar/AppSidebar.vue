<script lang="ts" setup>
import ArchiveModal from '../common/ArchiveModal.vue'
import SettingsModal from '../common/SettingsModal.vue'
import ProfileMenu from './ProfileMenu.vue'

const authStore = useAuthStore()
</script>

<template>
	<div
		class="flex w-fit justify-start bg-neutral-800 m-4 rounded-lg gap-5 p-4 items-center"
	>
		<ProfileMenu />

		<SettingsModal>
			<UButton
				variant="ghost"
				:ui="{
					leadingIcon: '!size-5',
				}"
				icon="lucide:settings"
			/>
		</SettingsModal>
		<ArchiveModal>
			<UButton
				variant="ghost"
				icon="lucide:archive"
				class=""
				:ui="{
					leadingIcon: '!size-5',
				}"
			/>
		</ArchiveModal>
		<UButton
			variant="ghost"
			icon="lucide:door-open"
			class=""
			:ui="{
				leadingIcon: '!size-5',
			}"
			@click="authStore.logout"
		/>
	</div>
</template>
