<script setup lang="ts">
import {computed, ref} from "vue";
import type { Ref } from "vue";

import {pathfindAnvilPlan} from "./calculation";
import FinalActions from "./components/FinalActions.vue";
import {Action, ActionIndex, Actions} from "./action";
import PathDisplay from "./components/PathDisplay.vue";

const finalGoal: Ref<number> = ref(0)

const offsets: Ref<[number, [Action, Action, Action]][]>
	= ref([[0, [Actions[ActionIndex.None], Actions[ActionIndex.None], Actions[ActionIndex.None]]]])

// Calculate the offset goal and remove any offsets that result in a goal outside the allowed range of [0, 150]
const goals = computed((): [number, [Action, Action, Action]][] =>
	offsets.value.map((offset): [number, [Action, Action, Action]] => [offset[0] + finalGoal.value, offset[1]])
		.filter(goal => goal[0] >= 0 && goal[0] <= 150)
)

const path = computed(() => pathfindAnvilPlan(goals.value))
</script>

<template>
	<main>
		<FinalActions v-model="offsets"></FinalActions>
		<label for="goal">
			Goal
			<input id="goal" v-model.number="finalGoal" type="number" placeholder="Goal" min="0" max="150"/>
		</label>
		<PathDisplay :path="path"/>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	align-items: center;
}

label {
	margin: 1em;
}
</style>
