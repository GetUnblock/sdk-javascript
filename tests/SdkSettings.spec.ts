import { faker } from '@faker-js/faker';
import { UserSessionData } from '../src/definitions';
import { propsMock } from './mocks/props.mock';

describe('SdkSettings', () => {
  describe('setUserSessionData', () => {
    it('Should update the user session data', () => {
      // Arrange
      const userSessionData: UserSessionData = {
        userUuid: faker.datatype.uuid(),
        unblockSessionId: faker.datatype.uuid(),
      };

      const sdkSettings = propsMock();

      // Act
      sdkSettings.setUserSessionData(userSessionData);

      // Assert
      expect(sdkSettings.userSessionData).toStrictEqual(userSessionData);
    });
  });
});
