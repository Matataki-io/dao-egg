'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class TokenController extends Controller {
  async list() {
    const { ctx } = this;
    const { pageindex, pagesize } = ctx.query;
    const result = await this.service.project.getProjectList(pageindex, pagesize);
    ctx.body = result;
  }
  async item() {
    const { ctx } = this;
    const { id, address } = ctx.query;
    let result = {};
    if (id) {
      result = await this.service.project.getProjectById(id);
    } else {
      result = await this.service.project.getProjectByAddress(address);
    }
    ctx.body = result;
  }
  async setProject() {
    const { ctx } = this;
    const { baseInfo = {}, miningInfo = [], resourceInfo = [] } = ctx.request.body;
    const result = await this.service.project.setProject(baseInfo, miningInfo, resourceInfo);
    ctx.body = result;
  }
  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const readableStreamForFile = fs.createReadStream(file.filepath);
    const result = await this.service.ipfs.pinFile(readableStreamForFile);
    await fs.unlinkSync(file.filepath);
    ctx.body = result;
  }
}

module.exports = TokenController;
