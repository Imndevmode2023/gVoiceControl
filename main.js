const googleLogin = require('./googleLogin');
const sendText = require('./sendText');

(async () => {
    const {browser, page} = await googleLogin();
    await sendText({browser, page});
})();
