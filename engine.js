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

    //console.log(worldSettings.things);
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
  let arguments = comm.commParts.slice(1);
  let argumentStatement = arguments.join(' ');

  //  get the command setting
  const commandSetting = worldSettings.commands.find(e => e.name === mainCommand);

  //  Check if main command is in the world settings
  if (commandSetting !== undefined){
      let failures = 0;

      let matchingArgs = [];
      //  see if the arguments match those for the given command
      for (const arg of commandSetting.args) {
        const matchingArg = worldSettings[arg].find(s => argumentStatement.includes(s.name));
        
        if (matchingArg !== undefined) {
          matchingArgs.push(matchingArg);
        }
        
        console.log(arg,arguments);
      }
              
      if (failures === 0)  {
        // update the world controller
        for (const res of commandSetting.res) {
          //  Store a switch case that dictates what each command should do
          let par;
          switch (res.parent) {
            case "player":
              par = worldSettings.player;
              break;
            default:
              let index = res.parent.split('_')[1];
              const argName = arguments[index];
              par = matchingArgs.find(a => a.name === argName);
              break;
          }

          //  get the proper argument object
          let chi;
          switch (res.child) {
            case "player":
              chi = worldSettings.player;
              break;
            default:
              let index = res.child.split('_')[1];
              const argName = arguments[index];
              chi = matchingArgs.find(a => a.name === argName);
              break;
          }

          switch (res.directive) {
            case ">":
              delete par[chi.name];
              break;
            case "<":
              par[chi.name] = {...chi};
              break;
          }

          console.log(par,chi)
        }

        result = `${worldSettings.player.name} ${mainCommand} ${argumentStatement}`;
      }
      else
        result = `That doesn't seem to work.`
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