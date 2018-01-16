import Disaster from '../models/disasters.model';
import logger from '../core/logger/app-logger';
import DataFormatter from '../utils/format.util';
import DisastersControllerUtil from '../utils/controllers/disasters.controller.util';

const controller = {};

// controller.getAll = async(req, res) => {
//   try {
//     const disasters = await Disaster.getAll();
//     logger.info('sending all disasters...');
//     res.send(disasters);
//   } catch (err) {
//     logger.error(`Error in getting disasters- ${err}`);
//     res.send('Got error in getAll');
//   }
// };

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
    if (DisastersControllerUtil.isValidDisasterURLParams(req.query)) {
      const filteredDisasters = await Disaster.getDisaster(req.query);
      logger.info('Getting diaster');
      res.status(201);
      res.render('index', {
        disasters: JSON.stringify({
          disasters: filteredDisasters,
        }),
      });
    } else {
      // if any of these parameters don't exist we want to redirect the URL and default the missing params
      const redirectURL = DisastersControllerUtil.formatRedirectURL(req.query);
      res.redirect(redirectURL);
    }

    // if (!startDate || !endDate || !disasterType) {
    //   const startDateURL = `${startDate || '1953-05-29'}`;
    //   const endDateURL = `${endDate || '1955-05-29'}`;
    //   const disasterTypeURL = `${disasterType || 'Flood'}`;
    //   const redirectURL = `/disasters?start-date=${startDateURL}&end-date=${endDateURL}&type=${disasterTypeURL}`;
    //   res.redirect(redirectURL);
    // }
  } catch (err) {
    logger.error(`Error in getting disasters - ${err}`);
    res.send('Got error in getDisaster');
  }
};

export default controller;
