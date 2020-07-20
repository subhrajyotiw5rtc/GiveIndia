const Mongoose = require('mongoose').Mongoose,
	{ ObjectID } = require('mongodb'),
	_ = require('lodash'),
	logger = require('./logger.util'),
	fs = require('fs');

class DemoProjectMongoUtil {

	/**
		Connect to given db
		@param database string
		@return connection instance
	**/
	async _connect() {
		const mongodebug = false;
		//const mongodebug = true;
		this.dbInstance = null;
		const mongooseInstance = new Mongoose();

		const url = `mongodb://admin:admin@localhost:27017/giveindia`;
		const options = {
			useNewUrlParser: true,
			useCreateIndex: true,
			connectTimeoutMS: 5000000,
			poolSize: 10000,
			useUnifiedTopology: true,
			// autoIndex: false
		};

		try {
			this.dbInstance = await mongooseInstance.connect(url, options);
			/**
				When no database connected request never ends.
				Following line will fix that issue.
			**/
			mongooseInstance.set('bufferCommands', false);
			mongooseInstance.set('useFindAndModify', false);
			if(mongodebug === true) {
				mongooseInstance.set('debug', true);
			}				
			logger.log(`Database connected: ${url}`, 'info');
		}
		catch(error) {
			logger.log(error.stack, 'error');
			return this.dbInstance;
		}

		return this.dbInstance;
	};

	/**
		Connect to master database
		@return connection instance
	**/
	async connectMasterDb() {
		return await this._connect();
	}

	

	/**
		Loads the mongo model
		@param collectionName string
		@return object collection instance
	**/
	collection(collectionName) {
		const models_path = `${_.get(process.env, 'root_dir', '')}/model`,
			model = `${models_path}/${collectionName}.model.js`;

		if(fs.existsSync(model)) {
			let SchemaModel = require(model);
			return this.dbInstance.model(collectionName, SchemaModel);
		}
		logger.log(`${collectionName} is not defined in models`, 'error');

		return null;
	}

	/**
		Checks if the value or values are objectId's, and if they are wraps them in
		new ObjectID. Otherwise it just returns the original input.
		@param {string|array} value
		@return {string|array|ObjectID}
	**/
	isObjectID(value) {
		let response = value;
		if (_.isArray(response)) {
			response = _.map(response, res => {
				if (ObjectID.isValid(res)) {
					return new ObjectID(res);
				}
				return res;
			});
		} else if (ObjectID.isValid(response)) {
			response = new ObjectID(response);
		}

		return response;
	}
}

const demoProjectMongoUtil = new DemoProjectMongoUtil();

module.exports = {
	loadMongoModel: demoProjectMongoUtil.collection.bind(demoProjectMongoUtil),
	connectMasterDb: demoProjectMongoUtil.connectMasterDb.bind(demoProjectMongoUtil),
	isObjectID: demoProjectMongoUtil.isObjectID.bind(demoProjectMongoUtil)
}

