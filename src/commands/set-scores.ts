import { chunk } from 'lodash';

import { Command } from './index.types';

type EmojiScorePair = [string, number];

// @TODO: Probably use some real DB or cache or whatever
export let savedScores: EmojiScorePair[] = [];

const EMOJI_REGEX = /\p{Emoji}/u;

const setScoresCommand: Command = {
  command: 'set-scores',
  description: 'Attach points to certain emojis',
  handler: (args, message) => {
    if (message.member?.hasPermission(['ADMINISTRATOR'])) {
      const clearedArgs = args.filter(Boolean).map((arg) => arg.trim());
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

      const emojiScorePair: EmojiScorePair[] = pairedArgs.map(
        ([emoji, score]) => [emoji, parseFloat(score)]
      );

      savedScores = emojiScorePair;

      return message.channel.send(
        'Successfully saved emoji-scores\n'.concat(
          savedScores
            .map(([emoji, score]) => `${emoji} - ${score} points`)
            .join('\n')
        )
      );
    } else {
      message.reply('Only administrators may use this command, sorry.');
    }
  },
};

export default setScoresCommand;
