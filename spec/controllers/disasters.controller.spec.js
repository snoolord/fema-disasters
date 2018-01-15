import Disaster from '../../models/disasters.model';
import DisastersController from '../../controllers/disasters.controller';
import {
  setTimeout,
} from 'timers';

require('babel-polyfill');

describe('Disaster Controller', () => {
  describe('DisasterModel.getDisaster', () => {
    const req = {
      query: {},
      params: {},
      body: {},
    };

    const res = {
      status: jasmine.createSpy().and.callFake(function (statusCode) {
        return this;
      }),
      send: jasmine.createSpy().and.callFake(function () {
        return this;
      }),
    };

    it('GET /disasters should call Disaster.getDisaster from the model', () => {
      spyOn(Disaster, 'getDisaster').and.callFake(() => {
        return;
      });
      DisastersController.getDisaster(req, res);
      expect(Disaster.getDisaster).toHaveBeenCalled();
    });
  });
});
