/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/',
  commands: [],

  // A page object can have elements
  elements: {
    // vuetify 的 <v-app> 标签自带 id="app"
    appContainer: '#app'
  },

  // Or a page objects can also have sections
  sections: {
    app: {
      selector: '#start',

      elements: {
        content: '[data-test=content]'
      },

      // - a page object section can also have sub-sections
      // - elements or sub-sections located here are retrieved using the "app" section as the base
      sections: {
        logo: {
          selector: '[data-test=logo]'
        },
        startBtn: {
          selector: '[data-test=startBtn]'
        },
        welcome: {
          // the equivalent css selector for the "welcome" sub-section would be:
          //  '#app [data-nw=v-hello]'
          selector: '[data-test=welcome]',

          elements: {
            header: {
              selector: '[data-test=header]',
              index: 0
            }
          }
        }
      }
    }
  }
};
