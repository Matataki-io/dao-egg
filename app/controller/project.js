'use strict';

const Controller = require('egg').Controller;

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
    const { baseInfo } = ctx.request.body;
    const result = await this.service.project.setProject(baseInfo);
    ctx.body = result;
  }
}

module.exports = TokenController;
