import { chunk } from 'lodash';
import { clearArgs, ADMIN_ONLY_MESSAGE } from '../utils';

import { Command } from './index.types';

type EmojiScorePair = Map<string, number>;

// @TODO: Probably use some real DB or cache or whatever
export let savedScores: EmojiScorePair = new Map([]);

const EMOJI_REGEX = /\p{Emoji}/u;

const setScoresCommand: Command = {
  command: 'set-scoremojis',
  description: 'Configure scoremojis for the server',
  handler: (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const clearedArgs = clearArgs(args);
      if (clearedArgs.length % 2 !== 0)
        return message.reply(
          'Invalid number of arguments, please check your emoji-core pairs.'
        );

      const pairedArgs = chunk(clearedArgs, 2);

      // Validation
      for (const [emoji, score] of pairedArgs) {
        const isEmojiOk = typeof emoji === 'string' && EMOJI_REGEX.test(emoji);
        const isScoreOk = isFinite(parseFloat(score));

        // @TODO: Scoremoji could have both emoji and score wrong
        if (!isEmojiOk)
          return message.reply(
            `Scoremoji **__${emoji}__** ${score} has a wrong emoji. Ensure it is a valid emoji.`
          );

        if (!isScoreOk)
          return message.reply(
            `Scoremoji ${emoji} **__${score}__** has a wrong score. Ensure it is a valid number.`
          );
      }

      const emojiScorePair: [string, number][] = pairedArgs.map(
        ([emoji, score]) => {
          const cleanedCustomEmoji = emoji.includes('<:')
            ? emoji.replace('<:', '').replace('>', '').split(':')[1]
            : emoji;

          return [cleanedCustomEmoji, parseFloat(score)];
        }
      );

      savedScores = new Map(emojiScorePair);

      return message.channel.send(
        'Successfully saved scoremojis\n'.concat(
          pairedArgs
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
