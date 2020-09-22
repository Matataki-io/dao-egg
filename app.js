'use strict';
const { Wallet } = require('@ethersproject/wallet');

class Bootstrapper {

  constructor(app) {
    this.app = app;
  }

  async didReady() {
    await this.loadCache();
  }

  async loadCache() {
    const privateKey = this.app.config.ss.RELAYER_PK;
    const wallet = new Wallet(privateKey);
    this.app.relayer = wallet;
  }

}

module.exports = Bootstrapper;
