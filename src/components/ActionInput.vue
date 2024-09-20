<script setup lang="ts">
import {computed} from "vue";

import { Action, Actions } from "../action";

const props = defineProps<{
	name: string,
	modelValue: Action
}>()
const emit = defineEmits<{
	'update:modelValue': [value: Action]
}>()

const value = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emit('update:modelValue', newValue)
	}
})
</script>

<template>
	<div class="action-inputs">
		<h3>{{ name }}</h3>

		<template v-for="action in Actions">
			<label>
				<input type="radio" v-model="value" :value="action"/>
				<img :src="action.image" :alt="action.name" :title="action.name"/>
			</label>
		</template>
	</div>
</template>

<style scoped lang="scss">
h3 {
	grid-column: 1 / -1;
	margin-bottom: 0;
	text-align: center;
}

.action-inputs {
	display: grid;

	grid-template-columns: repeat(5, 70px);
	grid-template-rows: min-content repeat(2, 70px);
}

input[type=radio] {
	appearance: none;
	margin: 0;
	padding: 0;

	+ img {
		cursor: pointer;

		padding: 3px;
	}

	&:checked + img {
		background-color: lightgray;
	}
}
</style>