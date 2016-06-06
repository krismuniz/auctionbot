# AuctionBot
A Facebook Messenger bot that serves as the interface between a server that handles auctions and the user. This is part of a hackathon project for [ATX Hack for Change 2016](http://atxhackforchange.org/).

**What is AuctionBot?**
> AuctionBot makes fundraising for non-profits and charities fun and easy via a very simple, addicting user experience.

*Warning: Although this bot works, it still needs development. This repo is for illustrative and educational purposes. It is provided it as is, with no guarantee that it will work in your machine, environment, setup, or use case.*

### Requirements for Running Locally

##### Dependencies

After cloning this repo to your machine, install all `npm` dependencies.

```bash
$ npm install
```

##### Environment Variables

* `PAGE_TOKEN` - Your FB Page Token
* `VERIFY_TOKEN` - Your FB Verify Token
* `PAGE_ID` - Your FB Page ID
* `SERVER_HOST` - Where your AuctionBot backend is hosted [URI]
* `STRIPE_DATA_KEY` - Your Stripe API Data Key for the embedded card information collection form
* `STRIPE_API_KEY` - Your Stripe API Key for charging a collected card
* `BOT_HOST` - A public HTTPS URI of the bot
* `ORGANIZATION_NAME` - The name of the organization running the auction

##### Auction server

This bot serves as an interface between the user and a server that handles all auctions. You would still need to develop it. A good example is the backend developed for this hackathon project: [`auctionbot-back`](https://github.com/aaronbenz/auctionbot-back)

##### Running

After you have all your environment variables, your auction server running and your bot subscribed to the Facebook Page via a webhook, just run `npm start` and AuctionBot will be live!

```
#bots4change
```
