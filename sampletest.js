
//this code is testing the Real time youtube app and Microsoft fabric for iTalent community 

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testWebsite() {
  // Set ChromeDriver options
  const options = new chrome.Options();
  options.addArguments('--disable-dev-shm-usage'); // Add any other necessary options

  // Create a new WebDriver instance with the options
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Navigate to the website
    await driver.get('https://www.youtube.com/watch?v=fr08TVQotu8'); //youtube working line
    // await driver.get('https://staging.community.fabric.microsoft.com/t5/user/loginpage') // fabric working line

    // Find the username and password input fields and enter the credentials

    // const usernameInput = await driver.findElement(By.id('lia-login')); // fabric working line
    // await usernameInput.sendKeys('ics_sysuser'); // fabric working line

    // const passwordInput = await driver.findElement(By.id('lia-password')); // fabric working line
    // await passwordInput.sendKeys('Q!w2e3r4');  // fabric working line

    // Submit the login form
    
    // const loginButton = await driver.findElement(By.id('submitContext_0')); // fabric working line
    // await loginButton.click(); // fabric working line
    // const OptionsMenu= await driver.wait(until.elementLocated(By.css('[title="Show option menu"]',1000))) // fabric working line
    // await OptionsMenu.click() // fabric working line

    // const Desktopsection = await driver.wait(until.elementLocated(By.className('board-dropdown-item lia-board-rd-discussion1'))) // fabric working line
    // await Desktopsection.click() // fabric working line
   
// const postNewmessage =await driver.wait(until.elementLocated(By.className('lia-button lia-button-primary'))) // fabric working line
// await postNewmessage.click() // fabric working line

//   const Subject = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('lia-subject'))), 1000); // fabric working line
// await Subject.sendKeys("new startups are increased day by day"); // fabric working line

// switch to new document
// const iframe = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('tinyMceEditor_ifr'))),10000); // fabric working line
// await driver.switchTo().frame(iframe); // fabric working line

// const paragraphElement  = await driver.findElement(By.tagName('p')) // fabric working line

//     await paragraphElement.sendKeys("There is a fast development in India") // fabric working line

//     await driver.switchTo().defaultContent(); // fabric working line


//     const SubmittheForum = await driver.findElement(By.id('submitContext_1')) // fabric working line
//     console.log(SubmittheForum) // fabric working line

//<============================{**upto this is working microsoft fabric test code}=========================>

// const textarea = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('tinyMceEditor'))),10000);
// console.log(textarea)
// Make the element visible using JavaScript
// await driver.executeScript("arguments[0].style.display = 'block';", textarea);

// Interact with the visible textarea element
// await textarea.sendKeys('Your text here');


// const Body = await driver.wait(until.elementIsVisible(driver.findElement(By.className('lia-form-tiny-mce-editor-input lia-editor-gte-2-input lia-message-editor'))), 15000);
// await Body.sendKeys("There is a fast development in India");

  // const Body = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('tinyMceEditor'))),1000);
  // await Body.sendKeys("There is a fast development in the India")

//<======================={*This is Youtube testing Code*}=====================>

  const container = await driver.findElement(By.id('container'));
  const start = await driver.wait(until.elementLocated(By.id('start')));
  const header = await driver.findElement(By.id('header'));
  const homeSidebar = await driver.wait(until.elementLocated(By.id('guide-button')),10000);
    await driver.wait(until.titleContains('YouTube'), 10000);
    await driver.wait(until.elementIsEnabled(homeSidebar),20000);
    await homeSidebar.click();

  const items =await driver.findElement(By.id('items'))
  const element = await driver.wait(
    until.elementLocated(By.css('[title="Shorts"]')),
    10000 // Timeout in milliseconds (adjust as needed)
  );
     
    
      await element.click()
     
      await new Promise((resolve) => setTimeout(resolve, 20000));

      await driver.quit()

      //<=================={**Upto this working}==================================>

// const YoutubeHomePage= await driver.findElement(By.className('title style-scope ytd-guide-entry-renderer'))

// await YoutubeHomePage.click()

// Get all the children of the button
// const script = 'return Array.from(arguments[0].children).map(child => child.innerHTML);';
// const children = await driver.executeScript(script, GoToButton);
// // console.log(children,"childern")
// // Check if the button has at least five children
// if (children.length >= 2) {
//   // Get the fifth child of the button
//   const fifthChild = children[2];

//   // Log the fifth child
//   console.log(fifthChild);
//   await fifthChild.click()
     
//   const pageTitle = await driver.getTitle();
//   console.log('Page title:', pageTitle);
// } else {
//   console.log('The button does not have enough children.');
// }

// Log the fifth child
     // click the fifth children
    
    // Perform further test actions..."

    //<===========>{**This is end of the youtube testing}<=========================>

    //<=============={**This is common code of lines for both the testing}=================>

  } catch (error) {
    console.error('An error occurred:', error);
    // Make sure to handle any errors that may occur during the process

    // Quit the WebDriver session in case of an error
    await driver.quit();
  }
}

// Call the test function
testWebsite();
//this code is testing the Real time youtube app and Microsoft fabric for iTalent community 
