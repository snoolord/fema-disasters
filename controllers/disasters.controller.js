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
      console.log(disasters[0]);
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
  const startDate = req.query['start-date'] ? new Date(req.query['start-date']) : Date.today() - 7;
  const endDate = req.query['end-date'] ? new Date(req.query['end-date']) : Date.today();
  const disasterType = req.query['type'] ? req.query['type'] : 'flood';

  const filteredDisasters = await Disaster.getDisaster(req.query);
  console.log(filteredDisasters.slice(0, 10));
  res.send(req.query);
  // res.send(`${startDate} ${endDate} ${disasterType}`);
};
// controller.addCar = async(req, res) => {
//   const carToAdd = Car({
//     name: req.body.name,
//   });
//   try {
//     const savedCar = await Car.addCar(carToAdd);
//     logger.info('Adding car...');
//     res.send(`added: ${savedCar}`);
//   } catch (err) {
//     logger.error(`Error in getting cars- ${err}`);
//     res.send('Got error in getAll');
//   }
// };

// controller.deleteCar = async(req, res) => {
//   const carName = req.body.name;
//   try {
//     const removedCar = await Car.removeCar(carName);
//     logger.info(`Deleted Car- ${removedCar}`);
//     res.send('Car successfully deleted');
//   } catch (err) {
//     logger.error(`Failed to delete car- ${err}`);
//     res.send('Delete failed..!');
//   }
// };

export default controller;
