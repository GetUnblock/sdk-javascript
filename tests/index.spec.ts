import { HelloWorld } from '../src/index';

describe('hello-world', () => {
  it('isValid', () => {
    const obj = new HelloWorld();

    expect(obj.sayHello()).toBe('Hello World');
  });
});
