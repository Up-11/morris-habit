<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
	<div class="w-full flex gap-2 cursor-default">
		<div class="bg-black/80 p-3 flex items-center justify-center rounded-lg">
			<UIcon name="lucide:star" size="20" />
		</div>
		<div class="flex flex-col">
			<h3 class="text-sm text-gray-400">Профиль</h3>
			<h3 class="text-lg">{{ authStore.user.displayName }}</h3>
		</div>
	</div>
</template>

<style scoped></style>
