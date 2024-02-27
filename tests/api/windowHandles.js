describe('.windowHandles() example test', function () {

  beforeEach(browser => browser.url('https://example.com'));

  afterEach(browser => browser.end());

  it('opens a new window when clicking a link', async function (browser) {

    await browser
      .windowHandles(result => {
        browser.assert.equal(result.value.length, 1);
      })
      .execute(function () {
        document.querySelector('a[href="https://www.iana.org/domains/example"]').target = '_blank'; // Link to another page
      })
      .click('a[href="https://www.iana.org/domains/example"]')
      .windowHandles(result => {
        browser.assert.equal(result.value.length, 2);
      })
      .windowHandles(function (result) {
        console.log('result:', result);
      });
  });

  it('can interact with elements in the new window', async function (browser) {

    await browser
      .execute(function () {
        document.querySelector('a[href="https://www.iana.org/domains/example"]').target = '_blank'; // Link to another page
      })
      .click('a[href="https://www.iana.org/domains/example"]')
      .windowHandles(result => {
        browser.assert.equal(result.value.length, 2);
      })
      .windowHandles(function (result) {
        console.log('result:', result);
        this.switchWindow(result.value[1])
      })
      .waitForElementVisible('#header')
      .assert.visible('#header');
  });
});