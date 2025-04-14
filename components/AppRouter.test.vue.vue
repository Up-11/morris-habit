<script lang="ts" setup>
import { ROUTES } from '../config/routes'

const routes = getAllValues(ROUTES)
</script>

<template>
	<div class="fixed right-5 bottom-5 z-1000">
		<UPopover placement="bottom">
			<UButton
				variant="solid"
				class="text-white bg-neutral-950 rounded-full"
				icon="lucide:align-vertical-space-around"
			/>
			<template #content>
				<div class="p-4 flex flex-col gap-1">
					<div v-for="route in routes" :key="route" class="w-full">
						<UButton
							variant="link"
							:to="route"
							class="hover:text-primary-400 cursor-pointer w-full"
							>{{ route }}</UButton
						>
					</div>
				</div>
			</template>
		</UPopover>
	</div>
</template>

<style scoped></style>
