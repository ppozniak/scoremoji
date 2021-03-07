import { NormalizedCommands } from './index.types';

import help from './help';

const commandsList = [help];

const commands = commandsList.reduce(
  (commandsObject: NormalizedCommands, { command, ...rest }) => {
    commandsObject[command] = {
      ...rest,
    };
    return commandsObject;
  },
  {}
);

export default commands;
