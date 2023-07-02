const sendText = async () => {
  try {
    const googleLogin = require('./googleLogin');
    const {browser, page } = await googleLogin();
    require('dotenv').config();

    console.log('Now in sendText module');
    await page.goto('https://voice.google.com');
    await new Promise(r => setTimeout(r, 1500))
    console.log('Now inside Google Voice! ');
    
 
    console.log('you are now Logged in to Account @voice.google.com');
    

    // Navigate to Google Voice messages
    await page.goto('https://voice.google.com/u/0/messages', { waitUntil: 'networkidle2' });


    console.log(' Pressing [Enter] to open the "Send a message" box')
    //await page.keyboard.press('Enter');
    const phoneNumber = process.env.PHONE_NUMBER;

    const song = "99 bottles of beer on the wall";
    let count = 99;
    let message = '';
    while (count > 0) {
      message += `${count} bottles of beer on the wall, ${count} bottles of beer.\n`;
      message += `Take one down, pass it around, ${count - 1} bottles of beer on the wall.\n\n`;
      count--;
    }

    // Split message into 160 character chunks
    const chunks = message.match(/.{1,160}/g);
    await new Promise(r => setTimeout(r, 1500));

    // Click on the "Send a message" field
    await page.click("#messaging-view > div > md-content > div > div > div > div.gmat-subhead-2");
    await new Promise(r => setTimeout(r, 2000));
    // Type the phone number 
    await page.keyboard.type(phoneNumber);

    // Press Enter to move to the text field
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 1000));
    // Tab 4 times to reach the "Send a message" field
    for(let i=0; i<4; i++){
     await page.keyboard.press('Tab');
    }
    //}
    // Press Enter to open the "Send a message" box
    //await page.keyboard.press('Enter');

    // Type the phone number 
    //await page.keyboard.type(process.env.PHONE_NUMBER);

    // Tab once and press Enter to move to the text field
   // await page.keyboard.press('Tab');
   //
    await new Promise(r => setTimeout(r, 1500));

    // Loop through each chunk and send it as a separate text
    for (let chunk of chunks) {
      // Paste the message chunk
      await page.keyboard.type(chunk);

      // Tab once and press Enter to send the message
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      // Log the sent message
      console.log('Sent a text message: ', chunk);

      // Wait for a while between each text
      await page.waitForTimeout(1000);
      
    }

    console.log('All texts sent!');

  } catch (err) {
    console.error(err);
  }
  browser.close();
};

module.exports = sendText;