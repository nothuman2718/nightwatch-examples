describe('duckduckgo example', function () {
  it('Search Nightwatch.js and check results', function (browser) {
    browser
      .navigateTo('https://duckduckgo.com')
      .waitForElementVisible('#searchbox_input')
      .sendKeys('#searchbox_input', ['Nightwatch.js'])
      .submitForm('form')
      .assert.visible('.react-results--main')
      .assert.textContains('.react-results--main', 'Nightwatch.js')
      .end();
  });
});
