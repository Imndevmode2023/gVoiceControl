# gVoiceControl
"G"+"oo"+"gle"\ Voice Text Sender
This is a Node.js project that automates sending text messages through "G"+"oo"+"gle" Voice. It uses Puppeteer, a Node library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

Prerequisites
To run this program, you need Node.js and NPM installed on your machine. You also need a "G"+"oo"+"gle" Voice account and the phone number of the recipient.

Installation
Clone the repository to your local machine.
Navigate into the project directory.
Run npm install to install the dependencies.
Environment Variables
You need to create a .env file in the project root with the following variable:


Copy code
PHONE_NUMBER='RecipientPhoneNumber'
Replace 'RecipientPhoneNumber' with the actual phone number of the recipient.

Running the Script
To run the script, use the following command in your terminal:

bash
Copy code
node sendText.js
How It Works
The script performs the following actions:

Logs into "G"+"oo"+"gle" using the "G"+"oo"+"gle"Login module.
Navigates to "G"+"oo"+"gle" Voice messages.
Creates a set of messages based on the song "99 bottles of beer on the wall".
Splits these messages into chunks of 160 characters each.
Opens the "Send a message" box in "G"+"oo"+"gle" Voice.
Inputs the recipient phone number from the .env file.
Loops through each chunk of the song and sends it as a separate text message.
Logs each sent message to the console.
Closes the browser once all messages are sent.
Errors
If an error occurs during the process, it will be logged to the console.

Notes
This script automates user interactions with a website, which may be against the terms of service of the website. Use this responsibly and consider the implications and potential consequences.
