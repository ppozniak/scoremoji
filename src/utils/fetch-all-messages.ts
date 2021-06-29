import { Collection, Message, TextChannel } from 'discord.js';

const MESSAGES_PER_FETCH = 100;

export const fetchAllMessages = async (
  channel: TextChannel
): Promise<Message[]> => {
  let allMessages: Message[] = [];
  let iterationMessageCount;
  let lastId;

  do {
    const messages: Collection<string, Message> = await channel.messages.fetch({
      limit: MESSAGES_PER_FETCH,
      ...(lastId ? { before: lastId } : {}),
    });

    iterationMessageCount = messages.size;
    allMessages = [...allMessages, ...Array.from(messages.values())];
    lastId = messages.lastKey();
  } while (iterationMessageCount >= MESSAGES_PER_FETCH);

  return allMessages;
};
