const formatDisaster = (unformattedDisaster) => {
  const {
    state,
    incidentType,
    incidentBeginDate,
    incidentEndDate,
  } = unformattedDisaster;

  console.log(incidentType, 'INCIDENTY TYPE');
  const relevantDisasterData = {
    locationData: {
      state,
    },
    disasterDescriptions: {
      incidentType,
    },
    durationData: {
      incidentBeginDate: new Date(incidentBeginDate.replace(/\s+/g, '')),
      incidentEndDate: new Date(incidentEndDate.replace(/\s+/g, '')),
    },
  };

  return relevantDisasterData;
};

const util = {
  formatDisaster,
};

export default util;
