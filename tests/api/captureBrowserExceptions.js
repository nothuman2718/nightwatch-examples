test('captureBrowserExceptions() example test', async function (browser) {

  let eventData;

  await browser.captureBrowserExceptions((event) => {
    eventData = event;
    console.log('>>> Exception:', event);
  });

  await browser.navigateTo('https://the-internet.herokuapp.com/windows');

  const buttonEl = await browser.executeScript(function () {
    // Create a new button
    const button = document.createElement('button');
    button.innerText = 'Test Button';
    button.id = 'testButton';
    button.setAttribute('onclick', 'throw new Error("Test error.")');

    // Append the button to the body
    document.body.appendChild(button);

    // Return the button's id so we can find it later
    return button.id;
  });

  console.log(buttonEl);

  await browser
    .waitForElementVisible('#' + buttonEl, 1000) // wait for the button to be visible
    .click('#' + buttonEl)
    .perform(function () {
      expect(eventData).is.an('object').and.not.null;
      expect(eventData).to.have.own.property('exceptionDetails');

      const { exceptionDetails } = eventData;
      expect(exceptionDetails.exception.description).to.include('Test error');
    });

});