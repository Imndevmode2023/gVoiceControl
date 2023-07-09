const puppeteerExtra = require ('puppeteer-extra');
const StealthPlugin = require ('puppeteer-extra-plugin-stealth');
require('dotenv').config();

puppeteerExtra.use(StealthPlugin());

    const googleLogin = async () => {
    const browser = await puppeteerExtra.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'] });
    const page = await browser.newPage();
    
    
    console.log('browser started gr8 work!')
    await page.goto('https://accounts.google.com/signin/v2/identifier');
    await page.type('#identifierId', process.env.GOOGLE_USER_ID);
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 3550));
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.keyboard.press('Enter'); 
    console.log('login successs now we will see what module is next...')
    await new Promise(r => setTimeout(r, 1000));
    console.log('...3...');
    await new Promise(r => setTimeout(r, 1000));
    console.log('...2...'); 
    await new Promise(r => setTimeout(r, 1000));
    console.log('...1...');
    await new Promise(r => setTimeout(r, 1000));
    
    return {browser, page}; 
};

module.exports = googleLogin;
