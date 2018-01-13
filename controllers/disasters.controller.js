import Disaster from '../models/disasters.model';
import logger from '../core/logger/app-logger';

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
    Disaster.seed().then((disasters) => {
      console.log(disasters[0]);
      console.log('resolving promise');
      Disaster.addDisaster(disasters[0]);
      // for (let index = 0; index < disasters.length; index++) {
      //   const disasterToAdd = disasters[index];
      // Disaster.addDisaster(disasterToAdd);
      // }
    });
    logger.info('Seeding...');
    res.send('Seeded!');
  } catch (err) {
    logger.error('Failed to seed');
    res.send('Seed failed..!');
  }
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