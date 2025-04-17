<script setup lang="ts"></script>

<template>
	<UModal
		:ui="{
			overlay: 'backdrop-blur-sm',
		}"
	>
		<slot />

		<template #content>
			<div>123</div>
		</template>
	</UModal>
</template>
