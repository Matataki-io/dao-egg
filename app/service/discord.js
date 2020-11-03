'use strict';

const Service = require('egg').Service;
// const Discord = require('discord.js');
// const configFile = require('../../config/config.default');
// const config = configFile({ name: 'Get Config' });


class DiscordService extends Service {
  sendMessage(message) {
    // const speaker = this.app.discord.speaker;
    // console.log('message', message);
    // console.log(speaker);
    try {
      // if (speaker) return speaker.send(message);
      console.log(`Missing bot message: ${message}`);
      return false;
    } catch (e) {
      console.log(e);
    }
  }
  editLastMessage(message) {
    // const client = this.app.discord.client;
    // let lastMessage = this.app.discord.lastMessage;
    // if (client.user.lastMessage) lastMessage = client.user.lastMessage;
    // if (lastMessage) return lastMessage.edit(message);
    return this.sendMessage(message);
  }
  setActivity(message) {
    // const client = this.app.discord.client;
    try {
      // client.user.setActivity(message, { type: 'WATCHING' });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = DiscordService;
