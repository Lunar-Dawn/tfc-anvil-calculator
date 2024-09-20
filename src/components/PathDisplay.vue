<script setup lang="ts">
import {Action} from "../action";

defineProps<{
	path: Action[]
}>()
</script>

<template>
<div>
	<img v-for="action in path" :src="action.image" :title="action.name" :alt="action.name">
</div>
</template>

<style scoped>

</style>