import { Command } from './index.types';

const helpCommand: Command = {
  command: 'help',
  description: 'General usage and commands',
  handler: (args, message) => {
    const prefix = process.env.BOT_PREFIX;
    message.channel.send(
      [
        ':robot: :1234: :trophy:',
        "Hello there! I'm a scoremoji bot.",
        'I count scores based on reactions and scoremojis you configure. _(emoji and points value pairs, for example :cookie: 5)_ ',
        '',
        '**Step by step guide**',
        '',
        ':one: **Configure scoremojis for your server:**',
        `\`${prefix} set-scoremojis :poop: 5 :smile: 10\``,
        '_This means :poop: will be worth 5 points and :smile: 10_',
        '_You can add as many pairs as you like_',
        `_You can view your current configuration with_ \`${prefix} show-scoremojis\``,
        '',
        ':two: **Get scores from channels:**',
        `\`${prefix} get-scores #general #channel2 #channel3\``,
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
