let worldSettings;
let worldController  = { 
  ready: false,
  player: {},
  settings: {}
};
let worldHistory = [];

(async function() {
    
    function readJson(path) {
        return fetch(path)
            .then(response => response.json());
    }
    
    worldSettings = await readJson('./WorldSettings.json');

    console.log(worldSettings.things);
})()


function setup(comm) {
  let person = worldSettings.persons.find(p => p.name === comm);

  if (person !== undefined) {
    worldSettings.player = person;
    return true;
  }
  else {
    return false;
  }
}

function handleTurn(comm) {
  let action = new Action(comm);
  action.result = processCommand(action);
  appendHistory(action);
  return action;
}

function disectCommand(command) {
  return comm = {
      raw: command,
      commParts: command.split(' ')
  }
}

function processCommand({comm,result}) {
  let mainCommand = comm.commParts[0];
  let arguments = comm.commParts.slice(1).join(' ');

  //  get the command setting
  const commandSetting = worldSettings.commands.find(e => e.name === mainCommand);

  //  Check if main command is in the world settings
  if (commandSetting !== undefined){
      let failures = 0;

      //  see if the arguments match those for the given command
      for (const arg of commandSetting.args) {
          //console.log(arg,arguments);
          const matchingArg = worldSettings[arg].find(s => arguments.includes(s.name));
          
          if (matchingArg) {
            // update the world controller
            failures++;
          }
      }

      if (failures > 0) 
          result = `${worldSettings.player.name} ${mainCommand} ${arguments}`;
  } else {
      result = `Nothing seems to happen.`;
  }

  return result;
}

function appendHistory(action) {
  worldHistory.push(action);
}


class Action {
    comm;
    result;

    constructor(command) {
      this.comm = disectCommand(command);
    }
}