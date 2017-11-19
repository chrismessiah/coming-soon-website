'use strict';

exports.getRouter = function getRouter(router, controller) {
  router.route('/')
    .get(controller.pages.index.get);

  router.route('/subscribe/')
    .post(controller.actions.subscribe);
  return router;
};
