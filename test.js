const puppeteer = require ('puppeteer-extra');
const http = require('http');
const fs = require('fs' );
const path = require('path');
const parse = require ('querystring');
const StealthPlugin = require ('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require ('puppeteer-extra-plugin-recaptcha');
require('dotenv').config();
puppeteer.use(StealthPlugin());

puppeteer.use(RecaptchaPlugin());            


const phoneNumber = process.env.PHONE_NUMBER;


async function loginToGoogleVoice() {
    let browser;
   try {
     console.log("Starting browser and getting ready to login..... ");
     browser = await puppeteer.launch({
         headless: false, defaultViewport : null,
         args: ['--disable-setuid-sandbox'],'ignoreHTTPSErrors' : true
     });
 
     // Create a new incognito browser context
     const pageContext = await browser.createIncognitoBrowserContext();
 
     // Create a new page inside context.
     page = await pageContext.newPage();
 
     // login page
     await page.goto('https://accounts.google.com/');
   
     // Perform login using credentials from .env file
     await page.type('#identifierId', process.env.GOOGLE_EMAIL);
     await page.click('#identifierNext');
     await page.waitForNavigation();
     await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
`    await page.click('#passwordNext');
     await page.waitForNavigation();
     await page.goto('https://voice.google.com');
     await page.waitForNavigation();
 
     console.log('Logged in to Account @ voice.google.com');
   } catch(err) {
     console.log('Could not log into account please check credentials and account info...',err)
   }
 }