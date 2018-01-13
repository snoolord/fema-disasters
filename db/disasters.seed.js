const csv = require('csvtojson');
const request = require('request');

/**
 * Seeds Database with Disasters
 * @param {}  - the JSON formatted for saving to the model
 * @returns {}
 */

function seed() {
  return new Promise((resolve, reject) => {
    const disasters = [];
    csv()
      .fromStream(request.get('https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries.csv'))
      .on('json', (jsonObj) => {
        disasters.push(jsonObj);
      })
      .on('done', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(disasters);
        }
      });
  });
}

export default seed;
