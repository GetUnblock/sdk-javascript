import SDK from '../src';
import { Singleton } from '../src/Singleton';

describe('index', () => {
  it('Should SDK be defined', () => {
    expect(SDK).toBeInstanceOf(Singleton);
  });
});
