const express = require('express'),
      controller = require('../controller/account.controller');
      Router = express.Router();




class DemoProjectRouter {

	getRouter() {

		try{

			Router.post('/transfer',controller.transferBalance.bind(controller));
			Router.post('/create',controller.createAccount.bind(controller));
			Router.get('/:id',controller.getAccountAsPerUserID.bind(controller));
			return Router;

		}catch(error) {
			console.log(error);
		}
	}
}

module.exports = new DemoProjectRouter();