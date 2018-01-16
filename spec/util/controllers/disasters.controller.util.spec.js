import DisasterControllerUtil from '../../../utils/controllers/disasters.controller.util';

import {
  log,
} from 'util';

require('babel-polyfill');

describe('Disaster Controller Util', () => {
  describe('DisasterControllerUtil.formatRedirectURL', () => {
    it('it should fill in the end-date and start-date when only querying for type', () => {
      const query = {
        type: 'Flood',
      };
      const formattedDisasterURL = DisasterControllerUtil.formatRedirectURL(query);
      expect(formattedDisasterURL.indexOf('1953-05-29') > -1).toBe(true);
      expect(formattedDisasterURL.indexOf('1955-05-30') > -1).toBe(true);
    });
    it('it should fill in the type and end-date when only querying for type', () => {
      const query = {
        'start-date': '1953-05-29',
      };
      const formattedDisasterURL = DisasterControllerUtil.formatRedirectURL(query);
      expect(formattedDisasterURL.indexOf('Flood') > -1).toBe(true);
      expect(formattedDisasterURL.indexOf('1953-6-1') > -1).toBe(true);
    });
    it('it should fill in the type and start-date when only querying for type', () => {
      const query = {
        'end-date': '1953-05-29',
      };
      const formattedDisasterURL = DisasterControllerUtil.formatRedirectURL(query);
      expect(formattedDisasterURL.indexOf('Flood') > -1).toBe(true);
      expect(formattedDisasterURL.indexOf('1953-05-22') > -1).toBe(true);
    });
  });
});
