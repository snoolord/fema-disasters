import FormatUtil from '../../utils/format.util';
import Disaster from '../../models/disasters.model';
import {
  log,
} from 'util';

require('babel-polyfill');

describe('Format Util', () => {
  describe('FormatUtil.formatDisaster', () => {
    it('should format the disaster output from csvtojson correctly and be validated by the mongoose model', () => {
      /* This function will fail when the model gets updated */
      const disasterData = {
        disasterNumber: '3',
        ihProgramDeclared: '0',
        iaProgramDeclared: '1',
        paProgramDeclared: '1',
        hmProgramDeclared: '1',
        state: 'LA',
        declarationDate: '1953-05-29T00:00:00 -04:00',
        disasterType: 'DR',
        incidentType: 'Flood',
        title: 'FLOOD',
        incidentBeginDate: '1953-05-29T00:00:00 -04:00',
        incidentEndDate: '1953-05-29T00:00:00 -04:00',
        disasterCloseOutDate: '1960-02-01T00:00:00 -05:00',
        declaredCountyArea: '',
        placeCode: '',
        hash: 'a18161d7a4b471c9e8a010a290285819',
        lastRefresh: '2016-12-18T11:07:49 -05:00',
      };
      const formattedDisasterData = FormatUtil.formatDisaster(disasterData);
      const disasterCandidate = new Disaster(formattedDisasterData);
      disasterCandidate.validate((err) => {
        expect(err).toBe(null);
      });
    });
  });
});
