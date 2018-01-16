import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';

Mongoose.Promise = global.Promise;

const connectToDb = async() => {
  const dbHost = config.dbHost;
  const dbPort = config.dbPort;
  const dbName = config.dbName;
  try {
    if (process.env.NODE_ENV === 'production') {
      Mongoose.connect('mongodb://heroku_nt34trk8:gnrl8933m1ia5nk2n0chlqe790@ds157057.mlab.com:57057/heroku_nt34trk8');
    } else {
      await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
        useMongoClient: true,
      });
    }
    logger.info('Connected to mongo!!!');
  } catch (err) {
    logger.error('Could not connect to MongoDB');
  }
};

export default connectToDb;
