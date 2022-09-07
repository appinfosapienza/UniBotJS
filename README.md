# UniBotJS

# WARNING: This bot is no longer mantained, but you are free to fork the code. For every info or support, contact the user Deco71

Discord bot based on Javascript and node.js for "La Sapienza Computer Science" server.

This bot can be easily adapted to other university servers.

## Getting started
This bot requires [npm](https://www.npmjs.com/).

Clone this repo, then from terminal:
```
npm install
```

Make sure to create a config.json file in the root directory of the bot with the following structure:
```
{
  "token": "your_token_here",
  "clientId":"your_client_id"
  "adminChannel": "your_admin_channel_id_here",
  "newsChannel": "your_news_channel_id_here",
  "newsInoltrerChannel": "your_news_inoltrer_channel_id_here"
}
```

## NPM Modules
The following modules are required to be installed:
- discord.js
- rss-parser
- axios
- jsdom

