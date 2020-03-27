////////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
////////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'e2e tests using page objects': (browser) => {
    const homepage = browser.page.homepage();
    homepage.waitForElementVisible('@appContainer');

    const app = homepage.section.app;
    app.assert.elementCount('@col', 5);
    app.expect.section('@welcome').to.be.visible;
    app.expect.section('@bar').text.to.match(/^Latest Release$/i);

    browser.end();
  },

  'verify if string "Ecosystem" is within the title': (browser) => {
    const homepage = browser.page.homepage();
    const welcomeSection = homepage.section.app.section.welcome;

    welcomeSection.expect.element('@firstTitle').text.to.contain('Welcome to Vuetify');
  }
};
