function isValidDisasterURLParams(urlParams) {
  const startDate = urlParams['start-date'];
  const endDate = urlParams['end-date'];
  const disasterType = urlParams['type'];

  // if any of these parameters don't exist we want to redirect the URL and default the missing params
  return startDate && endDate && disasterType;
}

function formatRedirectURL(urlParams) {
  const startDate = urlParams['start-date'] ? urlParams['start-date'] : '1953-05-29';
  const endDate = urlParams['end-date'] ? urlParams['end-date'] : '1955-05-29';
  const disasterType = urlParams['type'] ? urlParams['type'] : 'Flood';
  const redirectURL = `/disasters?start-date=${startDate}&end-date=${endDate}&type=${disasterType}`;

  return redirectURL;
}


const DisasterControllerUtil = {
  isValidDisasterURLParams,
  formatRedirectURL,
};
export default DisasterControllerUtil;
