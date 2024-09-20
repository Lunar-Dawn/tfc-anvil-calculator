import {Action, ActionIndex, Actions} from "./action";

const validActions = Actions.filter((g, i) => i != ActionIndex.None && i != ActionIndex.Any_Hit)

const pathfindAnvilPlan = (goals: [number, [Action, Action, Action]][]) : Action[] => {
	// The action taken to get to each position
	const searched = new Array<Action>(151)
	searched[0] = Actions[ActionIndex.None]

	const searchQueue = [0]

	for(;;) {
		const currentNode = searchQueue.shift() as number

		// No route found, probably because the offset requires us to stop outside the valid range
		if(currentNode == undefined)
			return []

		// We've found one of the goals, stop the search
		if(goals.map(g => g[0]).includes(currentNode))
			break

		// We're outside the valid range of values, skip this node
		if(currentNode < 0 || currentNode > 150)
			continue

		for(const action of validActions) {
			const newPos = currentNode + action.movements[0]

			// Already visited, skip
			if(searched[newPos] != undefined)
				continue

			searched[newPos] = action
			searchQueue.push(newPos)
		}
	}

	// Find the completed goal and start building the solution from its final actions
	const completedGoal = goals.filter((g) => searched[g[0]] != undefined)[0]
	const path: Action[] = completedGoal[1].filter(a => a.movements[0] != 0)

	// Retrace our steps, building the path back to 0
	let pathIndex = completedGoal[0]
	while(pathIndex != 0) {
		path.unshift(searched[pathIndex])
		pathIndex -= searched[pathIndex].movements[0]
	}

	return path
}

export {
	pathfindAnvilPlan,
}
