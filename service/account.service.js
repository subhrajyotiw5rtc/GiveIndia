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



	async createAccount(req,res) {

		let conn = null;

		try{

			conn = await connectMasterDb();

			if(_.isNull(conn)) {
				return false;
			}

			const accountCollection = loadMongoModel('account');
			let data = req.body;

			const record = await accountCollection.create(data);

			conn.disconnect();

			if(!record)
            {
                return setError('GI_ACC_ADD_ID_404');
            }

			return record;


		}catch(error) {

			logger.log(error.stack, 'error');
            _.set(error, 'code', 'GI_ACC_ADD_ID_404');
            conn.disconnect();

            return error;
		}
	}

	async getAccountAsPerUserID(id) {

		let conn = null;

		try{

			conn = await connectMasterDb();

			if(_.isNull(conn)) {
				return false;
			}

			const accountCollection = loadMongoModel('account');

			const record = await accountCollection.find({CustomerID:id});

			conn.disconnect();

			if(!record)
            {
                return setError('GI_ACC_ADD_ID_404');
            }

			return record;

		}catch(error) {
			logger.log(error.stack, 'error');
            _.set(error, 'code', 'GI_ACC_GET_ID_404');
            conn.disconnect();

            return error;
		}
	}

	async transferBalance(req,res) {

		let conn = null;
		let result = {};

		try{

			conn = await connectMasterDb();

			if(_.isNull(conn)) {
				return false;
			}

			let from = req.body.fromAccountId;
			let to = req.body.toAccountId;
			let amount = req.body.amount;



			const accountCollection = loadMongoModel('account');

			const ownInfo = await accountCollection.find({_id:from});

			const toInfo = await accountCollection.find({_id:to});

			if (ownInfo.length > 0 && toInfo.length > 0) {

				if (ownInfo[0] && toInfo[0]) {

					if (ownInfo[0]['CustomerID'] == toInfo[0]['CustomerID']) {

						return setError('GI_ACC_TRANS_SAME_404');
					}else {
						if (toInfo[0]['type'] === 'BasicSavings') {
							const tAmount = parseInt(amount) + parseInt(toInfo[0]['balance']);

							if (tAmount > 50000) {

								return setError('GI_ACC_TRANS_EXCEED_404');
							}else{
								//const session = await accountCollection.startSession();
                                //session.startTransaction();
                                //const opts = { session, new: true };
                                const A = await accountCollection.findOneAndUpdate({ _id: from }, { $inc: { balance: -amount } }, { new: true });
                                if (A.balance < 0) {
							      // If A would have negative balance, fail and abort the transaction
							      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
							      return setError('GI_ACC_TRANS_INF_404');
							    }
							    const B = await accountCollection.findOneAndUpdate({ _id: to }, { $inc: { balance: amount } }, { new: true });

							    //await session.commitTransaction();
							   // session.endSession();

								conn.disconnect();

								result = {
									newSrcBalance: A.balance,
									totalDestBalance: B.balance,
									UpdatedAt: B.UpdatedAt
								}

								return result;
							}
						}else{
							//const session = await accountCollection.startSession();
                            //session.startTransaction();
                            //const opts = { session, new: true };
                            const A = await accountCollection.findOneAndUpdate({ _id: from }, { $inc: { balance: -amount } }, { new: true });
                            if (A.balance < 0) {
						      // If A would have negative balance, fail and abort the transaction
						      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
						      return setError('GI_ACC_TRANS_INF_404');
						    }
						    const B = await accountCollection.findOneAndUpdate({ _id: to }, { $inc: { balance: amount } }, { new: true });

						    //await session.commitTransaction();
						    //session.endSession();

							conn.disconnect();

							result = {
								newSrcBalance: A.balance,
								totalDestBalance: B.balance,
								UpdatedAt: B.UpdatedAt
							}

							return result;
						}
					}
				}else{

					return setError('GI_ACC_TRANS_ID_404');
				}

			} else {
				return setError('GI_ACC_TRANS_MIS_404');
			}
		}catch(error) {
			logger.log(error.stack, 'error');
            _.set(error, 'code', 'GI_ACC_TRANS_ID_404');
            conn.disconnect();

            return error;
		}
	}
}

module.exports = new DemoProjectService();
