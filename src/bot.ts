import Discord from 'discord.js';
import commands from './commands';

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Connected');
});

client.on('message', (message) => {
  if (message.content.startsWith(`${process.env.BOT_PREFIX as string} `)) {
    const parts = message.content.split(' ');
    const command = parts[1];
    const args = parts.slice(2);

    if (commands[command]) {
      commands[command].handler(args, message, client);
    } else {
      console.log(`Command ${command} not found.`);
    }
  }
});

const bot = {
  start(): void {
    if (!process.env.BOT_PREFIX || !process.env.BOT_TOKEN) {
      console.error('Crucial env variables not provided!');
      return client.destroy();
    }
    client.login(process.env.BOT_TOKEN);
  },
};

export default bot;
