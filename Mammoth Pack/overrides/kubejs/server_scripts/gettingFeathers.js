//Thanks to Lady Lexxie#6969 for helping me get this working :)

let dropsFeathers = ['minecraft:chicken', 'eanimod:enhanced_chicken', 'chickens:chicken'] //add any feather-dropping animals here
let ShearsItem = ['minecraft:shears', 'aiotbotania:livingwood_shears', 'aiotbotania:livingrock_shears', 'botania:manasteel_shears', 'botania:elementium_shears', 'cyclic:shears_obsidian', 'cyclic:shears_flint', 'dungeons_gear:shear_dagger', 'pickletweaks: flint_shears', 'projecte:dm_shears', 'projecte:rm_shears'] //add appropriate shearing items here 
let feather = 'minecraft:feather' //in case you want a different kind of feather? 

function getChanceForFeather(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

onEvent('item.entity_interact', event => {
  if (event.hand == MAIN_HAND) {
    if (dropsFeathers.includes(`${event.target.type}`)) {
      if (event.target.tags.contains('nofeathersleft')) event.player.setStatusMessage('Try again later.')
      else {
        if (ShearsItem.includes(`${event.item.id}`)) {
          event.player.setStatusMessage('You snipped some feathers!')
          event.player.give(`${Math.floor(Math.random() * 5) + 1}x ${feather}`)
          event.target.tags.add('nofeathersleft')
          event.player.damageHeldItem(MAIN_HAND, 10)
          event.server.schedule(10 * MINUTE, () => {
            event.target.tags.remove('nofeathersleft')
            //event.player.setStatusMessage('The animal is ready now.')
          })
        } else {
          let chanceForFeather = getChanceForFeather(1,60)
          let oddsOfFeather = 50
          if (chanceForFeather < oddsOfFeather) {
            //event.player.tell(text.red(`Your roll was ${chanceForFeather} and so you did not get a feather.`))
            event.player.setStatusMessage('Their feathers remain firmly in place.')
            event.target.tags.add('nofeathersleft')
            event.server.schedule(10 * MINUTE, () => {
              event.target.tags.remove('nofeathersleft')
            //event.player.setStatusMessage('The animal is ready now.')
          })
          } else {
            //event.player.tell(text.red(`Your roll was ${chanceForFeather} and so you got a feather.`))
            event.player.setStatusMessage('They had a loose feather!')
            event.player.give('minecraft:feather')
            event.target.tags.add('nofeathersleft')
            event.server.schedule(10 * MINUTE, () => {
              event.target.tags.remove('nofeathersleft')
            //event.player.setStatusMessage('The animal is ready now.')
          })
          }          
        }
      }
    }
  }
})

function dropAnItemAtEntity(entity, item, count) {
  let entity = entity
  dropAnItemAtEntity.item = item
  let count = count
  dropAnItemAtEntity.spawn()
}

onEvent('server.tick', event => {
  let entities = event.server.getEntities()
  entities.forEach(entity => {
    if (dropsFeathers.includes(`${entity.type}`)) {
      let mightDropAFeather = getChanceForFeather(1,50000)
      let oddsDropAFeather = 50
      let dropAFeather = entity.block.createEntity('minecraft:item')    
      dropAFeather.item = "minecraft:feather"
      //console.log(`${mightDropAFeather}`)
      if (mightDropAFeather < oddsDropAFeather) {        
        dropAFeather.spawn()
        //console.log("You get a feather!")
      } else {
        //console.log("No feather")
      }
    } else {
      //leave it be
    }
  })
})