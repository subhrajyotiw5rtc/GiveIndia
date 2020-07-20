const _ = require('lodash'),
      {
      	loadMongoModel,
      	connectMasterDb,
      	isObjectID
      } = require('../utill/mongo.util'),
      fs = require('fs'),
      response = require('../utill/response.util'),
      logger = require('../utill/logger.util'),
      { setError } = require('../utill/exception.util'),
      { i18n } = require('../utill/i18n.util');



class DemoProjectService {

	async getCustomer(req,res) {

		let conn = null;

		try{

			conn = await connectMasterDb();

			if(_.isNull(conn)) {
				return false;
			}

			const customerCollection = loadMongoModel('customer');

			let Customer = await customerCollection.find({});

			conn.disconnect();

			if(!Customer)
            {
                return setError('GI_CUS_GET_SER_ID_404');
            }

			return Customer;
		}catch(error) {
			logger.log(error.stack, 'error');
            _.set(error, 'code', 'GI_CUS_GET_SER_ID_404');
            conn.disconnect();

            return error;
		}
	}

	async addCustomer(record) {

		let conn = null;

		try{
			conn = await connectMasterDb();

			if (_.isNull(conn)) {
				return false;
			}

			const customerCollection = loadMongoModel('customer');

			const Customer = await customerCollection.create(record);

			conn.disconnect();

			if(!Customer)
            {
                return setError('GI_CUS_SER_ID_404');
            }

			return Customer;

		}catch(error) {
			logger.log(error.stack, 'error');
            _.set(error, 'code', 'GI_CUS_SER_ID_404');
            conn.disconnect();

            return error;
		}
	}
}

module.exports = new DemoProjectService();
