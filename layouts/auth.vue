<script lang="ts" setup></script>

<template>
	<div class="min-h-screen">
		<div
			class="bg-[url(/image.jpg)] bg-center bg-cover bg-no-repeat fixed inset-0"
		>
			<div class="bg-black/80 -z-10 fixed backdrop-blur-md inset-0" />
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-[450px_1fr] h-screen p-10">
			<div
				class="flex flex-col h-full bg-neutral-900 max-sm:rounded-xl sm:rounded-l-xl text-nowrap w-full relative overflow-auto"
			>
				<div class="my-auto flex flex-col gap-4 justify-center items-center">
					<AppLogo />
					<slot />
				</div>
			</div>

			<div class="rounded-r-xl max-sm:hidden z-10 h-full overflow-hidden">
				<NuxtImg
					src="/image.jpg"
					class="rounded-r-xl object-cover w-full h-full"
					alt="auth-background"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
