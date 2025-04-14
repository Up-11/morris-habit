<script lang="ts" setup></script>

<template>
	<div class="min-h-screen">
		<div
			class="bg-[url(/image.jpg)] bg-center bg-cover bg-no-repeat fixed inset-0"
		>
			<div class="bg-black/80 -z-10 fixed backdrop-blur-md inset-0" />
		</div>

		<div
			class="grid grid-cols-1 sm:grid-cols-[450px_1fr] min-h-[calc(100dvh)] p-10 overflow-hidden"
		>
			<div
				class="flex flex-col h-full bg-neutral-900 max-sm:rounded-xl sm:rounded-l-xl text-nowrap w-full px-20 relative overflow-y-auto"
			>
				<div class="h-full my-auto">
					<slot />
				</div>
			</div>
			<div class="rounded-r-xl h-full z-10 overflow-hidden">
				<NuxtImg
					src="/image.jpg"
					class="h-full rounded-r-xl object-cover"
					alt="auth-background"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
