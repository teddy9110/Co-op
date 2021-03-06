module.exports = {

    perform: function(creep) {

        if (creep.memory.state == "idle" && creep.carry.energy == 0) {
            creep.memory.state = "empty";
        }
        else if (creep.memory.state == "empty" && creep.carry.energy == creep.carryCapacity) {
            creep.memory.state = "full";
        }
        if (creep.memory.state == "full") {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if (creep.carry.energy == 0) {
              creep.memory.state = "idle";
            }
        } else {
          var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
          if (energy.length) {
            console.log("Found " + energy[0].energy + " on the floor");
            creep.pickup(energy[0]);
          } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
          }
        }
    }
};
