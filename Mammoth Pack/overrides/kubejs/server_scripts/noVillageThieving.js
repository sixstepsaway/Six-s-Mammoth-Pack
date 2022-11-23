/**global.structure_notifications = Utils.newMap();
onEvent('entity.enter_chunk', event => {
    if (!event.entity.isPlayer()) return;

    if (event.world.getStructureAt(event.entity.block.pos, false, Feature.VILLAGE).isValid()) {
        if (!global.structure_notifications[event.entity.profile.id]) {
            event.entity.tell("Welcome to the village!");
            global.structure_notifications[event.entity.profile.id] = true;
        }
    } else {
        if (global.structure_notifications[event.entity.profile.id]) {
            event.entity.tell("Good Bye! Hope you enjoyed the village!")
            global.structure_notifications[event.entity.profile.id] = false;
        }
    }
});**/