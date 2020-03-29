// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'MyChair start page e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('#app [data-test=content')
      .assert.containsText('[data-test=header]', 'Welcome to MyChair')
      .assert.elementCount('canvas', 1)
      .end()
  },

  'MyChair start page e2e test using a custom command': browser => {
    browser
      .openStartpage()
      .assert.elementPresent('#app [data-test=content]')
      .end()
  }
};
