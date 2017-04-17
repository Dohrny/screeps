var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder')
var roleMineralHarvester = require('role.mineralHarvester')

var harvesterLimit = 2
var builderLimit = 1
var upgraderLimit = 3
var mineralHarvesterLimit = 0

module.exports.loop = function() {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var mineralHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineralHarvester')

    if (harvesters.length < harvesterLimit) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'harvester'
        });
        console.log('Spawning new harvester: ' + newName);
    }

    if (upgraders.length < upgraderLimit) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE], undefined, {
            role: 'upgrader'
        })
        console.log('Spawning new upgrader: ' + newName)
    }
    if (builders.length < builderLimit) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'builder'
        })
        console.log('Spawning new builder: ' + newName)
    }

    if (mineralHarvesters.length < mineralHarvesterLimit) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'mineralHarvester'})
      console.log('Spawing mineral harvester: ' + newName)
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep)
        }
        if (creep.memory.role == 'mineralHarvester') {
          roleMineralHarvester.harvestMinerals(creep)
        }
    }
}
