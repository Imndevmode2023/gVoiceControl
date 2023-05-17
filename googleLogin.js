const puppeteerExtra = require ('puppeteer-extra');
const StealthPlugin = require ('puppeteer-extra-plugin-stealth');
require('dotenv').config();

puppeteerExtra.use(StealthPlugin());

const googleLogin = async () => {
    const browser = await puppeteerExtra.launch({ headless: false});
    const page = await browser.newPage();
    
    console.log('browser started gr8 work!')
    await page.goto('https://accounts.google.com/signin/v2/identifier');
    await page.type('#identifierId', process.env.GOOGLE_EMAIL);
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 3550));
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.keyboard.press('Enter'); 
    console.log('login successs welcome to voiceControl prepare for first call in 4...')
    await new Promise(r => setTimeout(r, 1000));
    console.log('...3...');
    await new Promise(r => setTimeout(r, 1000));
    console.log('...2...'); 
    await new Promise(r => setTimeout(r, 1000));
    console.log('...1...');
    await new Promise(r => setTimeout(r, 1000));
    await page.goto('https://voice.google.com');
    await new Promise(r => setTimeout(r, 5500))
    console.log('Now inside Voice and accepting alets popup ');
    
    // Tab 3 times to reach the "Send a message" field
    for(let i=0; i<3; i++){
        await page.keyboard.press('Tab');
      }
    await new Promise(r => setTimeout(r, 5500));
   
   
    // press Enter to accept alerts in broswer notifications    
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 5500));

    console.log('you are now Logged in to Account @voice.google.com');
    
    return {browser, page}; 
};

module.exports = googleLogin;
