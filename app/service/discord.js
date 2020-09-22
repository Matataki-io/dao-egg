'use strict';

const Service = require('egg').Service;
const Discord = require('discord.js');


class DiscordService extends Service {
  constructor(ctx, app) {
    super(ctx, app);
    const token = this.config.ss.DISCORD_TOKEN;
    const channel = '747525655960354920';
    let lastMessage;
    const client = new Discord.Client();
    let speaker;
    client.on('ready', () => {
      console.log(`Discord bot logged as "${client.user.tag}"`);
      speaker = client.channels.cache.get(channel);
    });
    client.on('message', msg => {
      if (msg.content === 'ping') {
        msg.reply('pong');
      }
    });
    client.login(token);
    ctx.discord.client = client;
    ctx.discord.speaker = speaker;
    ctx.discord.lastMessage = lastMessage;
  }
  sendMessage(message) {
    const speaker = this.ctx.discord.speaker;
    try {
      if (speaker) return speaker.send(message);
      console.log(`Missing bot message: ${message}`);
      return false;
    } catch (e) {
      console.log(e);
    }
  }
  editLastMessage(message) {
    const client = this.ctx.discord.client;
    let lastMessage = this.ctx.discord.lastMessage;
    if (client.user.lastMessage) lastMessage = client.user.lastMessage;
    if (lastMessage) return lastMessage.edit(message);
    return this.sendMessage(message);
  }
  setActivity(message) {
    const client = this.ctx.discord.client;
    try {
      client.user.setActivity(message, { type: 'WATCHING' });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = DiscordService;
