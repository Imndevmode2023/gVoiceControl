const puppeteer = require ('puppeteer-extra');
const http = require('http');
const fs = require('fs' );
const path = require('path');
const parse = require ('querystring');
const StealthPlugin = require ('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require ('puppeteer-extra-plugin-recaptcha');
require('dotenv').config();
puppeteer.use(StealthPlugin());
puppeteer.useRecaptchaPlugin());            
(
const phoneNumber = process.env.PHONE_NUMBER;

// Function to log in to Google Voice
async function loginToGoogleVoice() {
  let browser; 
  let page;
  
  try {
    console.log("Starting browser and getting ready to login..... ");
    browser = await puppeteer.launch({
        headless: false, defaultViewport : null,
        args: ['--disable-setuid-sandbox'],'ignoreHTTPSErrors' : true
    });
    page = await browser.newPage();

    // login page
    await page.goto('https://accounts.google.com/');
  
    // Perform login using credentials from .env file
    await page.type('#identifierId', process.env.GOOGLE_EMAIL);
    await page.click('#identifierNext');
    await page.waitForNavigation();
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.click('#passwordNext');
    await page.waitForNavigation();
    await page.goto('https://voice.google.com');
    await page.waitForNavigation();

    console.log('Logged in to Account @ voice.google.com');
  } catch(err) {
    console.log('Could not log into account please check credentials and account info...',err)
    return browser;
  }

  return {browser, page};
}
                                                         
// Function to make a call
async function makeCall() {
  const {browser, page} = await loginToGoogleVoice();
  
  // Navigate to the Google Voice calls page
  await page.goto('https://voice.google.com/u/0/calls');
  await page.waitForSelector('.call-icon');
  
  // Make a call
  await page.click('.call-icon');
  console.log('Making a call to', phoneNumber);
  
  // Close the browser
  await browser.close();
}

// Function to send a text message
async function sendText() {
  const {browser, page} = await loginToGoogleVoice();
  
  // Navigate to the Google Voice messages page
  await page.goto('https://voice.google.com/u/0/messages');
  await page.waitForSelector('.start-new-conversation-button');
  
  // Send a text message
  await page.click('.start-new-conversation-button');
  await page.waitForSelector('.input-container textarea');
  
  const song = "99 bottles of beer on the wall";
  let count = 99;
  let message = '';

  while (count > 0) {
    message += `${count} bottles of beer on the wall, ${count} bottles of beer.\n`;
    message += `Take one down, pass it around, ${count - 1} bottles of beer on the wall.\n\n`;
    count--;
  }
  
  await page.type('.input-container textarea', message);
  await page.click('.send-button');
  
  console.log('Sent a text message to', phoneNumber);
  
  // Close the browser
  await browser.close();
}

// Set the interval to repeat the action (call or text)
const repeatIntervalSeconds = 55; // Replace with your desired interval in seconds

// Repeat the action every nth seconds
setInterval(makeCall
