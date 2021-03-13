import { Command } from './index.types';

const helpCommand: Command = {
  command: 'help',
  description: 'General usage and commands',
  handler: (args, message) => {
    message.channel.send(
      [
        'Hello there, I am scoremoji bot.',
        '',
        '__Instructions__',
        ":one: Assign score values to reactions if you haven't done it before:",
        '`!scoremoji set-scores :poop: 5 :smile: 10`',
        '',
        ':two: Run the following command with channels you want to count scores in:',
        '`!scoremoji get-scores #general #channel2 #channel3`',
        '',
        ':tada: Result will look like this:',
        '> 1 - Username1 - 10 points',
        '> 2 - Username2 - 5 points',
      ].join('\n')
    );
  },
};

export default helpCommand;
