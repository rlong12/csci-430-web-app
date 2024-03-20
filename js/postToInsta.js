require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

const postToInsta = async () => {
    console.log(process.env.IG_USERNAME)
    
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_PASSWORD);

    const imageBuffer = await get({
        url: 'https://i.imgur.com/BZBHsauh.jpg',
        encoding: null, 
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Second test post', // nice caption (optional)
    });
}

postToInsta();