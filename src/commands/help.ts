import { Command } from './index.types';

const helpCommand: Command = {
  command: 'help',
  description: 'General usage and commands',
  handler: (args, message) => {
    message.channel.send(
      [
        'Hello there, I am the scoremoji bot.',
        '_[WIP, THE COMMANDS ARE NOT READY, but the general idea will look like that]_',
        '* Firstly you should configure reactions you want to score, and how much one reaction is worth:',
        '`!scoremoji config :poop: 5; :smile: 10;`',
        '* Then simply run the command with channels you want to count the scores for:',
        '`!scoremoji scores #general`',
        '* Result will look like that:',
        '> 1 - Username1 - 10 points',
        '> 2 - Username2 - 5 points',
      ].join('\n')
    );
  },
};

export default helpCommand;
