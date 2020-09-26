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
  router.get('/api/project/list', controller.project.list);
  router.get('/api/project/item', controller.project.item);
  router.post('/api/project/set', controller.project.setProject);
};
