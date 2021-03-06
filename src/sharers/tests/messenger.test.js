import faker from 'faker';

import messenger from '../messenger';

describe('messenger', () => {
  beforeEach(() => {
    window.location.assign = jest.fn();
  });

  afterEach(() => {
    window.location.assign.mockReset();
  });

  it('should throw without fbAppId', () => {
    expect(messenger).toThrow('fbAppId is not defined');
  });

  it('should call with fbAppId', () => {
    const fixture = faker.random.number();

    messenger({ fbAppId: fixture });

    expect(window.location.assign.mock.calls[0][0]).toBe(`fb-messenger://share?app_id=${fixture}`);
  });

  it('should call with url and fbAppId', () => {
    const fixture = faker.internet.url();

    messenger({ url: fixture, fbAppId: 123 });

    expect(window.location.assign.mock.calls[0][0]).toBe(`fb-messenger://share?app_id=123&link=${encodeURIComponent(fixture)}`);
  });
});
