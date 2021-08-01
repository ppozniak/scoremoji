import { ServerConfigModel } from '../db/server-scoremojis';
import { ADMIN_ONLY_MESSAGE } from '../utils';

import { Command } from './index.types';

const getScoresCommand: Command = {
  command: 'show-scoremojis',
  description: 'Shows current scoremojis for the server',
  handler: async (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const { scoremojis } =
        (await ServerConfigModel.findById(message.guild?.id)) || {};

      if (!scoremojis) {
        message.channel.send(
          `This server does not have scoremojis set yet. Use \`${process.env.BOT_PREFIX} set-scoremojis\``
        );
      } else {
        const scoremojiList = scoremojis.map(
          ([emoji, score]) =>
            `${emoji} - ${score} ${score === 1 ? 'point' : 'points'}`
        );
        message.channel.send(`Current scoremojis:\n ${scoremojiList}`);
      }
    } else {
      message.reply(ADMIN_ONLY_MESSAGE);
    }
  },
};
export default getScoresCommand;
