import { chunk } from 'lodash';
import { clearArgs, ADMIN_ONLY_MESSAGE } from '../utils';

import { Command } from './index.types';

type EmojiScorePair = Map<string, number>;

// @TODO: Probably use some real DB or cache or whatever
export let savedScores: EmojiScorePair = new Map([]);

const EMOJI_REGEX = /\p{Emoji}/u;

const setScoresCommand: Command = {
  command: 'set-scores',
  description: 'Attach points to certain emojis',
  handler: (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const clearedArgs = clearArgs(args);
      if (clearedArgs.length % 2 !== 0)
        return message.reply(
          'Invalid number of arguments, please check your emoji score mapping.'
        );

      const pairedArgs = chunk(clearedArgs, 2);

      // Validation
      for (const [emoji, score] of pairedArgs) {
        const isEmojiOk = typeof emoji === 'string' && EMOJI_REGEX.test(emoji);
        const isScoreOk = isFinite(parseFloat(score));

        // @TODO: Some pairs could have both emoji and score wrong
        if (!isEmojiOk)
          return message.reply(
            `Pair **__${emoji}__** ${score} has a wrong emoji. Ensure it's a valid emoji.`
          );

        if (!isScoreOk)
          return message.reply(
            `Pair ${emoji} **__${score}__** has a wrong score. Ensure it's a proper number.`
          );
      }

      const emojiScorePair: [
        string,
        number
      ][] = pairedArgs.map(([emoji, score]) => [emoji, parseFloat(score)]);

      savedScores = new Map(emojiScorePair);
      // @TODO:
      // const cleanedCustomEmoji = emoji.includes('<:')
      // ? emoji.replace('<:', '').replace('>', '').split(':')[1]
      // : emoji;

      return message.channel.send(
        'Successfully saved emoji-scores\n'.concat(
          emojiScorePair
            .map(([emoji, score]) => `${emoji} - ${score} points`)
            .join('\n')
        )
      );
    } else {
      message.reply(ADMIN_ONLY_MESSAGE);
    }
  },
};

export default setScoresCommand;
