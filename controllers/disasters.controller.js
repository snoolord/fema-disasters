import Disaster from '../models/disasters.model';
import logger from '../core/logger/app-logger';
import DataFormatter from '../utils/format.util';

const controller = {};

controller.getAll = async(req, res) => {
  try {
    const disasters = await Disaster.getAll();
    logger.info('sending all disasters...');
    res.send(disasters);
  } catch (err) {
    logger.error(`Error in getting disasters- ${err}`);
    res.send('Got error in getAll');
  }
};

controller.seedData = async(req, res) => {
  try {
    await Disaster.seed().then((disasters) => {
      for (let index = 0; index < disasters.length; index++) {
        const formattedDisaster = DataFormatter.formatDisaster(disasters[index]);
        const disasterToAdd = new Disaster(formattedDisaster);
        Disaster.addDisaster(disasterToAdd);
      }
    });
    logger.info('Seeding...');
    res.send('Seeded!');
  } catch (err) {
    logger.error('Failed to seed');
    res.send('Seed failed..!');
  }
};

controller.getDisaster = async(req, res) => {
  try {
    const filteredDisasters = await Disaster.getDisaster(req.query);
    logger.info('Getting diaster');
    res.status(201);
    // res.send(filteredDisasters);
    res.render('index', {
      disasters: JSON.stringify({
        disasters: filteredDisasters,
      }),
    });
  } catch (err) {
    logger.error(`Error in getting disasters - ${err}`);
    res.send('Got error in getDisaster');
  }
};

export default controller;
