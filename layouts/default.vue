<script lang="ts" setup>
import AppSidebar from '~/modules/sidebar/AppSidebar.vue'
</script>

<template>
	<div class="">
		<AppSidebar />
		<div class="p-5">
			<slot />
		</div>
	</div>
</template>

<style scoped></style>
