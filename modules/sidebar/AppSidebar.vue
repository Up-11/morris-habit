<script lang="ts" setup>
import ArchiveModal from '../common/ArchiveModal.vue'
import SettingsModal from '../common/SettingsModal.vue'
import CreatePageModal from './CreatePageModal.vue'
import ProfileMenu from './ProfileMenu.vue'
import SidebarItem from './SidebarItem.vue'
</script>

<template>
	<div
		class="fixed flex flex-col bg-neutral-900 inset-y-0 border-r-white gap-5 w-[300px] border-r p-4"
	>
		<ProfileMenu />
		<div class="flex flex-col justify-center items-center">
			<UInput
				icon="i-lucide-search"
				size="xl"
				variant="soft"
				placeholder="Поиск по страницам..."
			/>
		</div>
		<SidebarItem :is-active="false" title="123" href="123" />
		<CreatePageModal>
			<div
				class="w-full pl-2 flex justify-between cursor-pointer items-center hover:text-primary-400 transition-colors"
			>
				<p class="text-md">Добавить страницу</p>
				<UIcon name="lucide:diamond-plus" size="20" />
			</div>
		</CreatePageModal>

		<SettingsModal>
			<UButton variant="ghost" icon="lucide:settings" class="mt-auto"
				>Настройки</UButton
			>
		</SettingsModal>
		<ArchiveModal>
			<UButton variant="ghost" icon="lucide:archive" class="">Архив</UButton>
		</ArchiveModal>
	</div>
</template>

<style scoped></style>
