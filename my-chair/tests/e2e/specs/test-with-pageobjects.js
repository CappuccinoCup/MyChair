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
    const startpage = browser.page.startpage();
    startpage.waitForElementVisible('@appContainer');

    const app = startpage.section.app;
    app.assert.elementCount('@content', 1);
    app.expect.section('@logo').to.be.visible;
    app.expect.section('@startBtn').text.to.match(/^Start now$/i);

    browser.end();
  },

  'verify if string "Ecosystem" is within the title': (browser) => {
    const startpage = browser.page.startpage();
    const welcomeSection = startpage.section.app.section.welcome;

    welcomeSection.expect.element('@header').text.to.contain('Welcome to MyChair');
  }
};
