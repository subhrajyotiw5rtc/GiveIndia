const _ = require('lodash'),
      service = require('../service/customer.service'),
      response = require('../utill/response.util'),
      logger = require('../utill/logger.util'),
      { i18n } = require('../utill/i18n.util');





class DemoProjectController {

	async getCustomer(req,res) {

		try{

			const data = await service.getCustomer(req,res);
			if(data instanceof Error)
            {
                return response.send(res, 'Failed', i18n(data.code), data.code);
            }

            response.send(res, 'Success', i18n('GI_CUST_GET_200'), 'GI_CUST_GET_200', data);
		}catch(error) {
			logger.log(error.stack, 'error');
            response.send(res, 'Failed', i18n('GI_CUS_GET_SER_ID_404'),'GI_CUS_GET_SER_ID_404');
		}
	}

	async addCustomer(req, res) {

		try{

			const data = await service.addCustomer(req.body);
			if(data instanceof Error)
            {
                return response.send(res, 'Failed', i18n(data.code), data.code);
            }

            response.send(res, 'Success', i18n('GI_CUST_ADD_200'), 'GI_CUST_ADD_200', data);

		}catch(error) {
			logger.log(error.stack, 'error');
            response.send(res, 'Failed', i18n('GI_CUS_SER_ID_404'),'GI_CUS_SER_ID_404');
		}
	}
}

module.exports = new DemoProjectController();