
function disectCommand(command) {
  return comm = {
      raw: command,
      commParts: command.split(' ')
  }
}

function processCommand({comm,result}) {
  const mainIndex = comm.raw.indexOf(' ')
  let mainCommand = comm.commParts[0];
  let argument = comm.commParts.slice(1);

  //  get the command setting
  const commandSetting = worldSettings.commands.find(e => e.name === mainCommand);

  //  Check if main command is in the world settings
  if (commandSetting !== undefined){
      let failures = 0;

      //  see if the arguments match those for the given command
      for (const arg of commandSetting.args) {
          const matchingArg = worldSettings[arg].find(s => argument.includes(s.name));
          if (matchingArg) failures++;
      }

      if (failures > 0) 
          result = `You ${mainCommand} ${argument}.`;
  } else {
      result = `Nothing seems to happen.`;
  }

  return result;
}