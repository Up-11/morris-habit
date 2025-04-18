<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<template>
	<div>
		<div v-if="authStore.isLoading">
			<FullscreenLoader />
		</div>
		<slot v-else />
	</div>
</template>

<style scoped></style>
