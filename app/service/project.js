'use strict';
const Service = require('egg').Service;

class ProjectService extends Service {
  async getProjectList(pi = 1, pz = 10) {
    const offset = (parseInt(pi) - 1) * parseInt(pz);
    const limit = parseInt(pz);
    const list = await this.app.mysql.select('project', {
      orders: [[ 'sort', 'desc' ]],
      limit,
      offset,
    });
    const count = await this.app.mysql.count('project');
    return {
      list,
      count,
    };
  }
  async getProjectById(id) {
    const item = await this.app.mysql.select('project', {
      where: { id },
    });
    if (item.length <= 0) return {};
    const resource = await this.app.mysql.select('resource', {
      where: { pid: id },
    });
    const mining = await this.app.mysql.select('mining', {
      where: { pid: id },
    });
    const project = item[0];
    return {
      ...project,
      resource,
      mining,
    };
  }
  async getProjectByAddress(address) {
    const item = await this.app.mysql.select('project', {
      where: { contract_address: address },
    });
    if (item.length <= 0) return {};
    const id = item[0].id;
    const resource = await this.app.mysql.select('resource', {
      where: { pid: id },
    });
    const mining = await this.app.mysql.select('mining', {
      where: { pid: id },
    });
    const project = item[0];
    return {
      ...project,
      resource,
      mining,
    };
  }
  async setProject(baseInfo = {}, miningInfo = [], resourceInfo = []) {
    const conn = await this.app.mysql.beginTransaction();
    const {
      blockchain = 'ethereum',
      name,
      logo,
      brief,
      intro,
      contract_address,
      contract_totalsupply,
      contract_audit,
      contract_audit_report,
      website,
      sort,
    } = baseInfo;
    const insertProject = await conn.insert('project', {
      blockchain,
      name,
      logo,
      brief,
      intro,
      contract_address,
      contract_totalsupply,
      contract_audit,
      contract_audit_report,
      website,
      sort,
    });
    const pid = insertProject.insertId;
    for (const item of miningInfo) {
      item.pid = pid;
    }
    for (const item of resourceInfo) {
      item.pid = pid;
    }
    const miningResult = await conn.insert('mining', miningInfo);
    const resourceResult = await conn.insert('resource', resourceInfo);
    console.log(miningResult, resourceResult);
    return insertProject;
  }
}

module.exports = ProjectService;
