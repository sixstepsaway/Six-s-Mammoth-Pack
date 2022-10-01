/**onEvent('player.logged_in', event => {
	if (!event.server.persistentData.hasLoaded) {

		console.log("World has finished loading for the first time!")
	} else {
		console.log("World has finished loading!")
	}	
});**/

//based originally on code from official site

// Listen to player login event
onEvent('player.logged_in', event => {
  // Check if player doesn't have "starting_items" stage yet
  if (!event.player.stages.has('starting_items')) {
    // Add the stage
    event.player.stages.add('starting_items')
    // Give some items to player
	event.player.give('ftbquests:book')
	event.player.give('minecraft:stone_sword')
	event.player.give(Item.of('minecraft:stone_pickaxe', "{Damage: 10}"))
	event.player.give('30x minecraft:apple')
  }
  if (!event.server.persistentData.hasLoaded) {
	console.log("World has finished loading for the first time!")
	event.server.schedule(120 * SECOND, () => {
		clearTrash(event)
	})
  } else {
	console.log("World has finished loading!")
  }
})

function clearTrash(event) {
	event.server.runCommandSilent(`crashutilities entities remove byType minecraft:item`)
	event.server.runCommandSilent(`crashutilities entities remove byType minecraft:falling_block`)
	event.server.persistentData.hasLoaded = true
	console.log("Worldgen items have been cleared.")
}

/**onEvent('block.left_click', event => {
	if (!event.server.persistentData.hasLoaded) {
		event.player.tell("No.")
	} else {
		event.player.tell("Yes.")
	}
	//clearTrash(event)
})**/