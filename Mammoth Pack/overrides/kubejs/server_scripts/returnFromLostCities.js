/**onEvent ("block.right_click", event => {
		event.server.runCommand(`execute in minecraft:overworld run tp ${event.player.id} 107 63 126`)

})**/


/**const lostCitytoOverworldBlock = ascpm:vent_entrance
const lostCitytoOverworldKey = ascpm:crowbar

onEvent("block.right_click", event => {
		
	if (event.hand == MAIN_HAND) {
				
		if (event.item.id == lostCitytoOverworldKey) {
			event.player.tell(text.blue("That's the item!"))
			event.player.tell(text.white(fromOverworldLoc))
		}
			
		if (event.block.id == lostCityBlock_first) { //if it's the base block
			event.player.tell(text.green("Oh! The way home!"))
			event.player.tell(text.red("Right click again to confirm your desire to travel..."))
			event.player.stages.add('confirmLCtravel')
			event.block.set(lostCityBlock_second)
		}
		
		
	}	
})**/