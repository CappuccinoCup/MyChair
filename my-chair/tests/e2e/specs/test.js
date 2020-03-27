// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('#app [data-nw=welcome-bar]')
      .assert.containsText('h1', 'Welcome to Vuetify')
      .assert.elementCount('p', 1)
      .end()
  },

  'example e2e test using a custom command': browser => {
    browser
      .openHomepage()
      .assert.elementPresent('#app [data-nw=welcome-bar]')
      .end()
  }
};
