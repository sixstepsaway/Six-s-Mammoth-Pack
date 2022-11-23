//based originally on code from official site

const seasons = ["EARLY_AUTUMN","EARLY_SPRING","EARLY_SUMMER","EARLY_WINTER","LATE_AUTUMN","LATE_SPRING","LATE_SUMMER","LATE_WINTER","MID_AUTUMN","MID_SPRING","MID_SUMMER","MID_WINTER"]

//adjusted from the serene seasons calendar code by Workmandoo#4242
const SeasonHelper = java("sereneseasons.api.season.SeasonHelper");

// Listen to player login event
onEvent('player.logged_in', event => {
	let seasonState = SeasonHelper.getSeasonState(event.level.minecraftLevel); // java api mumbo jumbo
    let subSeason = seasonState.getSubSeason().name(); // get the season
    let subSeasonName = subSeason.toLowerCase().replace("_", " "); // make the season more readable
  // Check if player doesn't have "starting_items" stage yet
  if (!event.player.stages.has('starting_items')) {
    // Add the stage
    event.player.stages.add('starting_items')
    // Give some items to player
	event.player.give('ftbquests:book')
	event.player.give('minecraft:stone_sword')
	event.player.give(Item.of('minecraft:stone_pickaxe', "{Damage: 10}"))
	event.player.give('30x minecraft:apple')
	event.player.tell(text.green(`Welcome! It is currently ${subSeasonName}.`))
  } else {
	event.player.tell(text.green(`Welcome back! It is currently ${subSeasonName}.`))
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

onEvent("world.load", event => {
	if (!event.server.persistentData.hasLoaded) {
		console.log("Randomizing the season now...")
		randomizeSeason(event)
		event.server.persistentData.hasLoaded = true;
	}
})

function clearTrash(event) {
	event.server.runCommandSilent(`crashutilities entities remove byType minecraft:item`)
	event.server.runCommandSilent(`crashutilities entities remove byType minecraft:falling_block`)
	event.server.persistentData.hasLoaded = true
	console.log("Worldgen items have been cleared.")
}

function randomizeSeason(event){
	let singularSeason = seasons[Math.floor(Math.random() * seasons.length)];
	event.server.runCommand(`season set ${singularSeason}`)
}