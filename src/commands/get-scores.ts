import { uniq } from 'lodash';

import { ServerConfigModel } from '../db/server-scoremojis';
import { ADMIN_ONLY_MESSAGE, fetchAllMessages } from '../utils';

import { Command } from './index.types';

const getScoresCommand: Command = {
  command: 'get-scores',
  description:
    "Count scores based on server's scoremojis from provided channels",
  handler: async (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const channels = uniq(Array.from(message.mentions.channels));

      if (!channels.length) {
        return message.reply(
          'You have to mention channels you want to get scores from.'
        );
      }

      const { scoremojis } =
        (await ServerConfigModel.findById(message.guild?.id)) || {};

      if (!scoremojis) {
        return message.reply(
          `Your server has no scoremojis. Use \`${process.env.BOT_PREFIX} help\` for more info`
        );
      }

      const scoremojisMap = new Map(scoremojis);

      channels.forEach(async ([, channel]) => {
        try {
          const messages = await fetchAllMessages(channel);
          const messagesReactions = messages.map(
            (message) => message.reactions.cache
          );

          const scoreMapping: Record<string, number> = {};
          messagesReactions.forEach((messageReactionCollection) => {
            messageReactionCollection.forEach((messageReaction, reaction) => {
              const score = scoremojisMap.get(reaction);
              const username = messageReaction.message.author.username;

              // @TODO: Not sure if reactions are cached, test it out.

              if (score) {
                scoreMapping[username]
                  ? (scoreMapping[username] += score)
                  : (scoreMapping[username] = score);
              }
            });
          });

          if (!Object.keys(scoreMapping).length) {
            const scoremojiKeys = Array.from(scoremojisMap.keys()).join(', ');

            return message.channel.send(
              `${channel}: There are no messages with any of the saved scoremojis (${scoremojiKeys})`
            );
          }

          const scoreTable = Object.entries(scoreMapping)
            .sort(([, a], [, b]) => {
              return a - b;
            })
            .reverse()
            .map(
              ([user, score]) =>
                `${user} - ${score} ${score === 1 ? 'point' : 'points'}`
            )
            .join('\n');

          const channelScore = Object.values(scoreMapping).reduce(
            (total, score) => total + score,
            0
          );

          message.channel.send(
            [
              '```',
              `Scores for #${channel.name} (${messages.length} messages):`,
              '----------------------------------------------',
              scoreTable,
              '',
              `Total score: ${channelScore}`,
              '```',
            ].join('\n')
          );
        } catch (error) {
          console.log(error);
          return [];
        }
      });
    } else {
      message.reply(ADMIN_ONLY_MESSAGE);
    }
  },
};
export default getScoresCommand;
