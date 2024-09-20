<script setup lang="ts">
import {computed, ref, watch} from "vue";

import ActionInput from "./ActionInput.vue";
import {Action, ActionIndex, Actions} from "../action";

const firstSelection  = ref(Actions[ActionIndex.None])
const secondSelection = ref(Actions[ActionIndex.None])
const thirdSelection  = ref(Actions[ActionIndex.None])

defineProps<{
	modelValue: [number, [Action, Action, Action]][]
}>()
const emit = defineEmits<{
	'update:modelValue': [value: [number, [Action, Action, Action]][]]
}>()

const allOffsets = computed((): [number, [Action, Action, Action]][] => {
	const offsets: [number, [Action, Action, Action]][] = []

	// Handle unpacking "any hit" into its three possible hits
	const unpackOptions = (action: Action) => {
		if(action.movements.length > 1) {
			return [Actions[ActionIndex.Light_Hit], Actions[ActionIndex.Medium_Hit], Actions[ActionIndex.Hard_Hit]]
		} else {
			return [action]
		}
	}

	// Stars I wish there was an easy cartesian product in JS
	for(const firstAction of unpackOptions(firstSelection.value)) {
		for(const secondAction of unpackOptions(secondSelection.value)) {
			for(const thirdAction of unpackOptions(thirdSelection.value)) {
				const offsetDistance = firstAction.movements[0] + secondAction.movements[0] + thirdAction.movements[0]
				offsets.push([-offsetDistance, [thirdAction, secondAction, firstAction]])
			}
		}
	}

	// Since we don't care about the order of different strength hits from two or more "any hit"s
	// Remove any combinations with identical numerical offsets
	return offsets
		.sort((o1, o2) => o1[0] - (o2[0]))
		.filter((offset, index, array) => index == 0 || offset[0] != array[index - 1][0])
})

watch(allOffsets, async (newOffsets: [number, [Action, Action, Action]][]) => {
	emit('update:modelValue', newOffsets)
})

</script>

<template>
	<div class="wrapper">
		<ActionInput name="Last"        v-model="firstSelection"/>
		<ActionInput name="Second Last" v-model="secondSelection"/>
		<ActionInput name="Third Last"  v-model="thirdSelection"/>
	</div>
</template>

<style scoped>
.wrapper {
	display: grid;
	grid-template-columns: repeat(3, min-content);
	gap: 20px;
}
</style>