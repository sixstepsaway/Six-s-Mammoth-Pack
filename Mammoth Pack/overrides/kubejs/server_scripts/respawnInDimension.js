/**onEvent('entity.death', event => {

    {
        if (event.entity.isPlayer()) {
            event.entity.player.data.IsDead = true
        }
    }
})

onEvent('player.tick', event => {

    if (event.entity.player.data.IsDead == true && event.player.isAlive()) {
        event.entity.player.data.IsDead = false
    }
})**/