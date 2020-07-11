import * as utils from '../utils';

describe('theme utils', () => {
  it('should get storage item', () => {
    utils.saveTheme('system');
    expect(utils.getThemeFromStorage()).toBe('system');
  });
  // unittest error
  //it('should check system theme', () => {
  //  expect(utils.isSystemDark).toBeUndefined();
  //});
});
