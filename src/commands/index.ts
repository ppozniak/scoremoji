import { NormalizedCommands } from './index.types';

import help from './help';
import setScoremojis from './set-scoremojis';
import getScores from './get-scores';

const commandsList = [help, setScoremojis, getScores];

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
