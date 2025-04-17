<script setup lang="ts">
defineProps<{ color: string; isActive: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
	<div
		class="rounded-xl size-12 border-2 border-transparent cursor-pointer flex items-center justify-center"
		:class="[isActive ? 'border-2 border-white' : 'border-transparent']"
		:style="{ backgroundColor: color }"
		@click="$emit('click')"
	>
		<UIcon v-if="isActive" name="lucide:check" class="text-black" size="20" />
	</div>
</template>

<style scoped></style>
