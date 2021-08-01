import Discord from 'discord.js';

import { connectToDatabase } from './db';
import commands from './commands';

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Scoremoji has successfully started');
});

client.on('message', (message) => {
  if (message.content.startsWith(`${process.env.BOT_PREFIX as string} `)) {
    const parts = message.content.split(' ');
    const command = parts[1];
    const args = parts.slice(2);

    if (commands[command]) {
      commands[command].handler(args, message, client);
    } else {
      console.log(`Command ${command} not found`);
    }
  }
});

const bot = {
  async start(): Promise<void> {
    if (!process.env.BOT_PREFIX || !process.env.BOT_TOKEN) {
      client.destroy();
      throw new Error('Error: Crucial ENV variables not provided!');
    }

    await connectToDatabase();

    client.login(process.env.BOT_TOKEN);
  },
};

export default bot;
