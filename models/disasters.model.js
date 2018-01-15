import mongoose from 'mongoose';
import seed from '../db/disasters.seed';

require('babel-polyfill');

const DisasterSchema = new mongoose.Schema({
  locationData: {
    state: {
      type: String,
      required: true,
    },
    // TODO: Add more fields from the dataset when needed
  },
  disasterDescriptions: {
    incidentType: {
      type: String,
    },
  },
  durationData: {
    incidentBeginDate: {
      type: Date,
      required: true,
    },
    incidentEndDate: {
      type: Date,
      required: true,
    },
  },
});

const DisasterModel = mongoose.model('Disaster', DisasterSchema);

DisasterModel.getAll = () => {
  return DisasterModel.find({});
};

DisasterModel.addDisaster = async(disasterToAdd) => {
  disasterToAdd
    .save()
    .then(() => {
      console.log('Successfully added disaster');
    })
    .catch((err) => {
      console.log(err);
    });
};


DisasterModel.seed = async() => {
  DisasterModel.remove({}, () => {
    console.log('remove all disasters');
  });
  return seed();
  // seed().then((disasters) => {
  //   disasters.forEach(disaster => {
  //     Disaster.addDisaster(disaster)
  //   });
  // }).catch((err) => {
  //   console.log('error');
  // });
};

DisasterModel.getDisaster = async(queryParams) => {
  const query = DisasterModel.formatQuery(queryParams);
  return DisasterModel.find(query);
};

DisasterModel.formatQuery = (queryParams) => {
  const startDate = queryParams['start-date'] ? new Date(queryParams['start-date']) : new Date('1953-05-29');
  const endDate = queryParams['end-date'] ? new Date(queryParams['end-date']) : new Date('1955-05-30');
  const disasterType = queryParams['type'] ? queryParams['type'] : 'Flood';
  console.log(startDate, endDate);
  const query = {
    disasterDescriptions: {
      incidentType: disasterType,
    },
    'durationData.incidentBeginDate': {
      $gte: startDate,
    },
    'durationData.incidentEndDate': {
      $lte: endDate,
    },
  };
  return query;
};
export default DisasterModel;
