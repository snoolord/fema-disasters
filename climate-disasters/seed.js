const Csv = require("csvtojson");
const DisasterSeedData = "./data/data.csv";
const Disaster = require("../models/disaster.js");
/**
 * Seeds Database with Disasters
 * @param {}  - the JSON formatted for saving to the model
 * @returns {}
 */

function seed() {
  let typeCount = {};
  Csv()
    .fromFile(DisasterSeedData)
    .on("json", jsonObj => {
      // onombine csv header row and csv line to a json object
      // console.log(jsonObj);
      const {
        state,
        incidentType,
        incidentBeginDate,
        incidentEndDate
      } = jsonObj;
      const relevantDisasterData = {
        locationData: {
          state
        },
        disasterDescription: {
          incidentType
        },
        durationData: {
          incidentBeginDate,
          incidentEndDate
        }
      };
      const disasterCandidate = new Disaster(relevantDisasterData);
      disasterCandidate
        .save(relevantDisasterData)
        .then(() => {
          console.log("success");
        })
        .catch(err => {
          console.log(err);
        });
      if (typeCount[jsonObj.incidentType]) {
        typeCount[jsonObj.incidentType]++;
      } else {
        typeCount[jsonObj.incidentType] = 1;
      }
    })
    .on("done", error => {
      console.log(typeCount);
      console.log("end");
    });
}

seed();
