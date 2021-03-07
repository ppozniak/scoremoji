import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', (...args) => {
  console.log('Connected', args);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

const bot = {
  start(): void {
    client.login(process.env.BOT_TOKEN);
  },
};

export default bot;
