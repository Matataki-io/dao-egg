'use strict';

const Service = require('egg').Service;
const Discord = require('discord.js');
const configFile = require('../../config/config.default');
const config = configFile({ name: 'Get Config' });

const token = config.ss.DISCORD_TOKEN;
const channel = '761066043304181806';
let lastMessage;
const client = new Discord.Client();
let speaker;
client.on('ready', () => {
  console.log(`Discord bot logged as "${client.user.tag}"`);
  // console.log('client', client.channels);
  speaker = client.channels.cache.get(channel);
  /* let message = '#0xAba8cAc6866B83Ae4eec97DD07ED254282f6aD8A\n\n';
  message += '**test**\n\n';
  message += 'test22\n\n';
  message += '<https://ipfs.fleek.co/ipfs/QmTW1Xf1zuG1rLguc8PcdpScYzAE73x4zvs784wVigbw3s>';
  speaker.send(message); */
  // console.log('speaker: ', speaker);
});
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
client.login(token);


class DiscordService extends Service {
  sendMessage(message) {
    // const speaker = this.app.discord.speaker;
    // console.log('message', message);
    // console.log(speaker);
    try {
      if (speaker) return speaker.send(message);
      console.log(`Missing bot message: ${message}`);
      return false;
    } catch (e) {
      console.log(e);
    }
  }
  editLastMessage(message) {
    // const client = this.app.discord.client;
    // let lastMessage = this.app.discord.lastMessage;
    if (client.user.lastMessage) lastMessage = client.user.lastMessage;
    if (lastMessage) return lastMessage.edit(message);
    return this.sendMessage(message);
  }
  setActivity(message) {
    // const client = this.app.discord.client;
    try {
      client.user.setActivity(message, { type: 'WATCHING' });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = DiscordService;
