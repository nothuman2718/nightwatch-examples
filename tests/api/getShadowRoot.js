test('getShadowRoot() example test', async function (browser) {
  await browser
    .navigateTo('https://mdn.github.io/web-components-examples/popup-info-box-web-component/')
    .waitForElementVisible('form');

  const shadowRootEl = await browser.getShadowRoot('popup-info');
  const infoElement = await shadowRootEl.find('.info');

  await expect(infoElement.property('innerHTML')).to.include('card validation code');
  const iconElement = await shadowRootEl.find('.icon');
  const firstElement = await browser.getFirstElementChild(iconElement);

  // Added pause because, this will become flaky test if not
  await browser.pause(100); // The firstElement is taking some time to getFirstElementChild

  await expect.element(firstElement).to.be.an('img');

});