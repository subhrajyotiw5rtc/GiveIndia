const express = require('express'),
      controller = require('../controller/customer.controller'),
      Router = express.Router();
      




class DemoProjectRouter {

	getRouter() {

		try{
			Router.get('/', controller.getCustomer.bind(controller));
			Router.post('/add',controller.addCustomer.bind(controller));
			return Router;

		}catch(error) {
			console.log(error);
		}
	}
}

module.exports = new DemoProjectRouter();