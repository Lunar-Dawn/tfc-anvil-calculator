type Action = { name: string, movements: number[], image: string }

enum ActionIndex {
	None = 0,
	Any_Hit = 5,
	Light_Hit = 6,
	Medium_Hit = 7,
	Hard_Hit = 8,
}

const Actions: Action[] = [
	{ name: "None", movements: [0], image: "/action_images/none.png" },

	{ name: "Punch", movements: [2], image: "/action_images/punch.png" },
	{ name: "Bend", movements: [7], image: "/action_images/bend.png" },
	{ name: "Upset", movements: [13], image: "/action_images/upset.png" },
	{ name: "Shrink", movements: [16], image: "/action_images/shrink.png" },


	{ name: "Any Hit", movements: [-3, -6, -9], image: "/action_images/hit_any.png" },

	{ name: "Light Hit", movements: [-3], image: "/action_images/hit_light.png" },
	{ name: "Medium Hit", movements: [-6], image: "/action_images/hit_medium.png" },
	{ name: "Hard Hit", movements: [-9], image: "/action_images/hit_hard.png" },
	{ name: "Draw", movements: [-15], image: "/action_images/draw.png" },
]

export {
	type Action,
	Actions,
	ActionIndex,
}
