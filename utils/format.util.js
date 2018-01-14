const formatDisaster = (unformattedDisaster) => {
  const {
    state,
    incidentType,
    incidentBeginDate,
    incidentEndDate,
  } = unformattedDisaster;

  const relevantDisasterData = {
    locationData: {
      state,
    },
    disasterDescriptions: {
      incidentType,
    },
    durationData: {
      incidentBeginDate: incidentBeginDate.replace(/\s+/g, ''),
      incidentEndDate: incidentEndDate.replace(/\s+/g, ''),
      // incidentBeginDate: new Date(incidentBeginDate.replace(/\s+/g, '')),
      // incidentEndDate: new Date(incidentEndDate.replace(/\s+/g, '')),
    },
  };

  return relevantDisasterData;
};

const util = {
  formatDisaster,
};

export default util;
