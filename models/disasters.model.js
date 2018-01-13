import mongoose from 'mongoose';
import seed from '../db/disasters.seed';

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

DisasterModel.addDisaster = (disasterToAdd) => {
  const {
    state,
    incidentType,
    incidentBeginDate,
    incidentEndDate,
  } = disasterToAdd;

  const relevantDisasterData = {
    locationData: {
      state,
    },
    disasterDescription: {
      incidentType,
    },
    durationData: {
      incidentBeginDate: new Date(incidentBeginDate.replace(/\s+/g, '')),
      incidentEndDate: new Date(incidentEndDate.replace(/\s+/g, '')),
    },
  };
  const disasterCandidate = new Disaster(relevantDisasterData);
  disasterCandidate
    .save()
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
};

DisasterModel.seed = () => {
  console.log('hi');
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

export default DisasterModel;
