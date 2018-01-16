import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './core/logger/app-logger';
import morgan from 'morgan';
import config from './core/config/config.dev';
import connectToDb from './db/connect';
import disasters from './routes/disasters.route';

require('babel-polyfill');

const port = config.serverPort;
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(morgan('dev', {
  stream: logger.stream,
}));
app.use(express.static(`${__dirname}/`));
app.set('views', `${__dirname}/views`);
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/views/map.ejs', (req, res) => {
  res.render('map');
});
app.use('/disasters', disasters);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

app.listen(process.env.PORT || port, () => {
  logger.info('server started - ', process.env.PORT || port);
});