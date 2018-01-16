function isValidDisasterURLParams(urlParams) {
  const startDate = urlParams['start-date'];
  const endDate = urlParams['end-date'];
  const disasterType = urlParams['type'];

  // if any of these parameters don't exist we want to redirect the URL and default the missing params
  return startDate && endDate && disasterType;
}

function formatRedirectURL(urlParams) {
  const disasterType = urlParams['type'] ? urlParams['type'] : 'Flood';
  let startDate = urlParams['start-date'] ? urlParams['start-date'] : null;
  let endDate = urlParams['end-date'] ? urlParams['end-date'] : null;

  function createDate(beforeOrLater) {
    let year;
    let month;
    let day;

    if (beforeOrLater === 'later') {
      [year, month, day] = startDate.split('-');
      if (day + 7 > 28) {
        month++;
        day = 1;
      } else {
        day += 7;
      }
    } else if (beforeOrLater === 'before') {
      [year, month, day] = endDate.split('-');
      if (day - 7 < 1) {
        month--;
        day = 28;
      } else {
        day -= 7;
      }
    }
    return [year, month, day].join('-');
  }

  if (!startDate && !endDate) {
    // type must have been the only thing passed in default to these dates
    startDate = '1953-05-29';
    endDate = '1955-05-30';
  } else if (!startDate) {
    // no start date passed in so we have endDate
    startDate = createDate('before');
  } else if (!endDate) {
    // no end date passed in but we have start date
    endDate = createDate('later');
  }

  const redirectURL = `/disasters?start-date=${startDate}&end-date=${endDate}&type=${disasterType}`;
  return redirectURL;
}


const DisasterControllerUtil = {
  isValidDisasterURLParams,
  formatRedirectURL,
};
export default DisasterControllerUtil;
