import express from 'express';
import disastersController from '../controllers/disasters.controller';
import configDev from '../core/config/config.dev';

const router = express.Router();

// router.get('/allcars', (req, res) => {
//   carController.getAll(req, res);
// });

// router.post('/addcar', (req, res) => {
//   carController.addCar(req, res);
// });

// router.delete('/deletecar', (req, res) => {
//   carController.deleteCar(req, res);
// });

router.get('/seed', (req, res) => {
  disastersController.seedData(req, res);
});

router.get('/', (req, res) => {
  disastersController.getDisaster(req, res);
});

router.get('/filter', (req, res) => {
  res.send(req.query);
});
export default router;
