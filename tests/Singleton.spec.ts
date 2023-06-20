import { Singleton } from '../src/Singleton';

describe('Singleton', () => {
  describe('getInstance', () => {
    // Happy
    it('Should return a Singleton Type', () => {
      expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
    });

    it('Should invoke constructor if no instance', () => {
      // Arrange
      jest.mock('../src/Singleton', () => {
        return {
          Singleton: jest.fn().mockImplementationOnce(() => {
            return { instance: () => undefined };
          }),
        };
      });

      expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
    });
  });
});
