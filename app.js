const express = require('express'),
      http = require('http'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      xss    = require('xss-clean'),
      helmet = require('helmet'),
      fs   = require('fs'),
      logger = require('./utill/logger.util'),
      mongoSanitize = require('express-mongo-sanitize');



const app = express();

/*

  @ Added the in built middlewares.
*/

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(xss());
app.use(mongoSanitize());
app.use(express.static(__dirname+'/public'));
app.use(helmet());
app.use(bodyParser.json({limit: "25mb"}));



const server = http.createServer(app);
process.env.root_dir = __dirname;

const root_path = __dirname+'/router';
logger.init();

fs.readdirSync(root_path).forEach(file => {
	const split = file.split('.');
	split.pop();
	const router = require(`${root_path}/${file}`);
	app.use(`/${split[0]}`, router.getRouter());
})

app.get('/', (req,res) => {
	res.status(200).render('index.html');
})

server.listen('3000',() => {
	console.log('server is running ar port 3000: '+process.pid);
});
