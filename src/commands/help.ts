import { Command } from './index.types';

const helpCommand: Command = {
  command: 'help',
  description: 'General usage and commands',
  handler: (args, message) => {
    message.channel.send(
      [
        'Hello there UwU',
        "I'm a scoremoji bot. I count scores based on reactions and scoremojis (emoji to score pairs) you configure.",
        '',
        '__How to?__',
        ':one: Set scoremojis for your server:',
        '`!scoremoji set-scoremojis :poop: 5 :smile: 10`',
        '__This means :poop: will be worth 5 points and :smile: 10',
        '__You can add as many pairs as you like__',
        '',
        ':two: Run the following command with channels you want to get scores from:',
        '`!scoremoji get-scores #general #channel2 #channel3`',
        '',
        ':tada: Result will look like this:',
        '```',
        `Scores for #channel1:`,
        '----------------------------------------------',
        'AlmightyPotatoe - 15 points',
        'PrincessPlum - 10 points',
        '',
        `Total score: 25`,
        '```',
      ].join('\n')
    );
  },
};

export default helpCommand;
