import { uniq } from 'lodash';
import { ADMIN_ONLY_MESSAGE } from '../utils';
import { Command } from './index.types';
import { savedScores } from './set-scores'; // @TODO: naturally use DB for that...

const getScoresCommand: Command = {
  command: 'get-scores',
  description: 'Get scoremojis from selected channels',
  handler: async (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const channels = uniq(Array.from(message.mentions.channels));

      if (!channels.length)
        return message.reply(
          'You have to mention channels you want to get score from.'
        );

      if (!savedScores.size)
        return message.reply('There are no scoremojis set.');

      channels.forEach(async ([, channel]) => {
        try {
          const messages = await channel.messages.fetch({ limit: 100 });
          const messagesReactions = messages.map(
            (message) => message.reactions.cache
          );

          const scoreMapping: Record<string, number> = {};
          messagesReactions.forEach((messageReactionCollection) => {
            messageReactionCollection.forEach((messageReaction, reaction) => {
              const score = savedScores.get(reaction);
              const username = messageReaction.message.author.username;

              // @TODO: Custom emojis are not working
              // @TODO: Not sure if reactions are cached, test it out.
              console.log(savedScores.keys(), reaction);

              if (score) {
                scoreMapping[username]
                  ? (scoreMapping[username] += score)
                  : (scoreMapping[username] = score);
              }
            });
          });

          const scoreTable = Object.entries(scoreMapping)
            .sort(([, a], [, b]) => a + b)
            .map(([user, score]) => `${user} - ${score} points`)
            .join('\n');

          const channelScore = Object.values(scoreMapping).reduce(
            (total, score) => total + score
          );

          message.channel.send(
            [
              '```',
              `Scoremojis for #${channel.name}:`,
              '------------------------------',
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
