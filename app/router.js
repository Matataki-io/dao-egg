'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app;
  router.get('/api/', controller.home.index);
  router.get('/api/:token/proposals', controller.token.list);
  router.get('/api/:token/proposal/:id', controller.token.item);
  router.post('/api/message', controller.vote.index);

  // create by zx
  router.get('/api/project/list', controller.project.list);
  router.get('/api/project/item', controller.project.item);
  router.post('/api/project/create', controller.project.create);
  router.post('/api/project/update', controller.project.update);
  router.post('/api/uploadfile', controller.project.uploadFile);
};
