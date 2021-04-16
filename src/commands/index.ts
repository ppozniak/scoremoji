import { NormalizedCommands } from './index.types';

import help from './help';
import setScores from './set-scores';
import getScores from './get-scores';

const commandsList = [help, setScores, getScores];

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
