// priority: 0

//settings.logAddedRecipes = true
//settings.logRemovedRecipes = true
//settings.logSkippedRecipes = true
//settings.logErroringRecipes = true

console.info('Hello, World! (You will only see this line once in console, during startup)')

/** onEvent('item.registry', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})**/

onForgeEvent("net.minecraftforge.event.world.BlockEvent$PortalSpawnEvent", (event) => {
    event.setCanceled(true)
})

/**onEvent('recipes', event => {

})


 event.remove({}) // Removes all recipes (nuke option, usually not recommended)
  event.remove({output: 'minecraft:stone_pickaxe'}) // Removes all recipes where output is stone pickaxe
  event.remove({output: '#minecraft:wool'}) // Removes all recipes where output is Wool tag
  event.remove({input: '#forge:dusts/redstone'}) // Removes all recipes where input is Redstone Dust tag
  event.remove({mod: 'quartzchests'}) // Remove all recipes from Quartz Chests mod
  event.remove({type: 'minecraft:campfire_cooking'}) // Remove all campfire cooking recipes
  event.remove({id: 'minecraft:glowstone'}) // Removes recipe by ID. in this case, data/minecraft/recipes/glowstone.json
  event.remove({output: 'minecraft:cooked_chicken', type: 'minecraft:campfire_cooking'}) // You can combine filters, to create ANDk logic **/