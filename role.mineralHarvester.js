var roleMineralHarvester = {
  /** @param {Creep} creep **/

  harvestMinerals: function(creep) {
    if (!creep.carry[RESOURCE_HYDROGEN] || creep.carry[RESOURCE_HYDROGEN] < creep.carryCapacity) {
      var minerals = creep.room.find(FIND_MINERALS)
      if (creep.harvest(minerals[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(minerals[0])
      }else (
        creep.harvest(minerals[0])
      )
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
      }
    }
  }
}

module.exports = roleMineralHarvester
