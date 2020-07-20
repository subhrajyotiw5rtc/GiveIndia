const _ = require('lodash'),
      service = require('../service/account.service'),
      response = require('../utill/response.util'),
      logger = require('../utill/logger.util'),
      { i18n } = require('../utill/i18n.util');




class DemoProjectController {

	async transferBalance(req,res) {

		try{

			const data = await service.transferBalance(req,res);
			if(data instanceof Error)
            {
                return response.send(res, 'Failed', i18n(data.code), data.code);
            }

            response.send(res, 'Success', i18n('GI_ACC_TRANS_200'), 'GI_ACC_TRANS_200', data);
		}catch(error) {
			logger.log(error.stack, 'error');
            response.send(res, 'Failed', i18n('GI_ACC_TRANS_ID_404'),'GI_ACC_TRANS_ID_404');
		}
	}

	async getAccountAsPerUserID(req, res) {

		try{

			const data = await service.getAccountAsPerUserID(req.params.id);
			if(data instanceof Error)
            {
                return response.send(res, 'Failed', i18n(data.code), data.code);
            }

            response.send(res, 'Success', i18n('GI_ACC_GET_200'), 'GI_ACC_GET_200', data);

		}catch(error) {
			logger.log(error.stack, 'error');
            response.send(res, 'Failed', i18n('GI_ACC_GET_ID_404'),'GI_ACC_GET_ID_404');
		}
	}

	async createAccount(req, res) {

		try {

			const data = await service.createAccount(req,res);

			if(data instanceof Error)
            {
                return response.send(res, 'Failed', i18n(data.code), data.code);
            }

            response.send(res, 'Success', i18n('GI_ACC_ADD_200'), 'GI_ACC_ADD_200', data);
		}catch(error) {

			logger.log(error.stack, 'error');
            response.send(res, 'Failed', i18n('GI_ACC_ADD_ID_404'),'GI_ACC_ADD_ID_404');
		}
	}
}

module.exports = new DemoProjectController();