import { Command } from './index.types';

const helpCommand: Command = {
  command: 'help',
  description: 'General usage and commands',
  handler: (args, message) => {
    message.channel.send(
      [
        'Hello there UwU',
        "I'm a scoremoji bot. I count scores based on reactions and scoremojis (emoji to score pairs :cookie: 5) you configure.",
        '',
        '**How to?**',
        ':one: Configure scoremojis for your server:',
        '`!scoremoji set-scoremojis :poop: 5 :smile: 10`',
        '_This means :poop: will be worth 5 points and :smile: 10_',
        '_You can add as many pairs as you like_',
        '',
        ':two: Get scores from channels:',
        '`!scoremoji get-scores #general #channel2 #channel3`',
        ':tada: Result will look like this:',
        '```',
        `Scores for #channel1:`,
        '----------------------------------------------',
        'AlmightyPotato - 15 points',
        'PrincessPlum - 10 points',
        '',
        `Total score: 25`,
        '```',
      ].join('\n')
    );
  },
};

export default helpCommand;
