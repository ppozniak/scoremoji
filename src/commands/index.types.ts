import { Message, Client } from 'discord.js';

export type Command = {
  command: string;
  description?: string;
  handler: CommandHandler;
};

export type CommandHandler = (
  args: string[],
  message: Message,
  client: Client
) => void;

export type NormalizedCommands = Record<string, Omit<Command, 'command'>>;
