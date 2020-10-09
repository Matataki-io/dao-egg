'use strict';
const { Wallet } = require('@ethersproject/wallet');
const Discord = require('discord.js');

class Bootstrapper {

  constructor(app) {
    this.app = app;
  }

  async didReady() {
    await this.loadCache();
    // await this.loadDiscord();
  }

  async loadCache() {
    const privateKey = this.app.config.ss.RELAYER_PK;
    const wallet = new Wallet(privateKey);
    this.app.relayer = wallet;
  }
  async loadDiscord() {
    const token = this.app.config.ss.DISCORD_TOKEN;
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
    this.app.discord.client = client;
    this.app.discord.speaker = speaker;
    this.app.discord.lastMessage = lastMessage;
  }

}

module.exports = Bootstrapper;
