const _ = require('lodash'),
	fs = require('fs'),
	moment = require('moment');

class DemoProjectLoggerUtil {

	/**
		When app starts create new logger file
		in the logs path from environment configurations
	**/
	init() {		
		this._checkLogFile();		
		this.log('Server started', 'info');
	}

	/**
		Writes log info / error to log file
	**/
	log(log_msg, log_msg_type) {
		const log_file = _.get(process.env, 'log_file', ''),
			log_types = {
				// info: "Info: ",
				error: "Error: ",
				// focus: "Focus Info: "
			},
			msg_type = _.get(log_types, log_msg_type, '');

		if(!_.isEmpty(msg_type)) {
			// this._checkLogFile();
			// fs.appendFileSync(log_file, `${msg_type}${moment().format("DD-MM-YYYY HH:mm:ss")} - ${log_msg}\n`, {encoding: 'utf8', flag: 'a'})
			const stream = fs.createWriteStream(log_file, { flags: 'a' });
			stream.write(`${msg_type}${moment().format("DD-MM-YYYY HH:mm:ss")} - ${log_msg}\n`);
			stream.end();
		}
	}

	/**
		Create log file if not exists
	**/
	_checkLogFile() {
		let config_log_path = `${_.get(process.env, 'root_dir', '')}/logs`,
			messages = [];
		const log_file = _.get(process.env, 'log_file', '');
		

		if(_.isEmpty(log_file)) {
			messages = this._createLogFile();
		}
		else if(!fs.existsSync(log_file)) {
			messages = [];
			fs.writeFileSync(`${log_file}`, '', {encoding: 'utf8', flag: 'w'});
			messages.push('Log file has been removed. Created new one again');
		}
		else if(fs.existsSync(log_file)) {
			const stats = fs.statSync(log_file),
				fileSizeInBytes = stats["size"],
				fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

			//If log file reaches 50MB create new log file
			if(fileSizeInMegabytes >= 50) {
				messages = this._createLogFile();
				messages.push('Log file size exceeds 50MB. So created new one again')
			}		
		}

		// If messages not empty, write logs
		if(!_.isEmpty(messages)) {
			messages.forEach(message => {
				this.log(message, 'info');
			})
		}
	}

	_createLogFile() {
		let config_log_path = `${_.get(process.env, 'root_dir', '')}/logs`;
		const messages = [];

		if (_.isEmpty(config_log_path)) {
			messages.push(`Log path is not set in configurations. But trying to create a folder logs in project root folder`);
			config_log_path = 'logs';
		}

		// const log_path = `${environment.getConfigValue('root_dir')}/${config_log_path}`;
		const log_path = `${config_log_path}`;
		//if log path not exists creat it now
		if(!fs.existsSync(log_path)) {
			messages.push(`Log folder is not exists. Creating it now`);
			fs.mkdirSync(log_path);
		}

		//create log file
		// const log_file = `edQart_log_${moment().format("DD-MM-YYYY_HH:mm:ss")}.log`;
		const log_file = `giveindia_log.log`;
		if(!fs.existsSync(`${log_path}/${log_file}`)) {
			fs.writeFileSync(`${log_path}/${log_file}`, '', {encoding: 'utf8', flag: 'w'});
		}
		else {
			fs.appendFileSync(`${log_path}/${log_file}`, `-----------------------------------\n`, {encoding: 'utf8', flag: 'a'});
		}
		_.set(process.env, 'log_file', `${log_path}/${log_file}`);
		messages.push(`Log file created`);

		return messages;
	}
}

module.exports = new DemoProjectLoggerUtil();

