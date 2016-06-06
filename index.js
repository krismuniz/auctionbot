'use strict'
require('dotenv').load() // load environment variables

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const request = require('request')

const port = process.env.PORT || 8080
const Botkit = require('botkit')

// ~ libraries
const getUserData = require('./misc/get_user_data')
const setCta = require('./misc/set_cta')

// ~ messages, message constructors
const welcomeMessage = require('./messages/welcome_message')
const showProducts = require('./messages/show_products')

// ~ routers
const index = require('./routers/index')
const pay = require('./routers/pay')
const notifications = require('./routers/notifications')

/* --------------------------- REQUESTS TO SERVER ---------------------------- */

const postUserData = (data) => {
  let options = {
    method: 'POST',
    body: data,
    uri: `${process.env.SERVER_HOST}/api/users/`,
    json: true
  }

  request(options, (err, res) => {
    if (err) console.log(err)
    console.log(`User ${data.first_name} posted to server.`)
  })
}

const getItems = (cb) => {
  request(`${process.env.SERVER_HOST}/api/items/`, (err, res, body) => {
    if (err) console.log(err)
    cb(JSON.parse(body))
  })
}

const postBid = (data, cb) => {
  let options = {
    method: 'POST',
    body: data,
    uri: `${process.env.SERVER_HOST}/api/bids/`,
    json: true
  }

  request(options, cb)
}

/* --------------------------------------------------------------------------- */

// # setup express server
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// # setup public folder
const publicPath = path.join(__dirname, './public')
app.use(express.static(publicPath))

// # setup view engine middleware
const viewsPath = path.join(__dirname, './views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use('/pay', pay)
app.use('/notifications', notifications)
app.use('/', index)

/* -------------------------------- BOTKIT ----------------------------------- */

// # init Facebook Messenger bot
const controller = Botkit.facebookbot({
  access_token: process.env.PAGE_TOKEN,
  verify_token: process.env.VERIFY_TOKEN
})

let bot = controller.spawn({})

// # Profile API middleware
controller.middleware.receive.use(getUserData)

controller.hears('.*', 'message_received', (bot, message) => {
  let command = message.text.split('_')

  switch (command[0]) {
    case 'SHOW-PRODUCTS':
      getItems((data) => {
        bot.reply(message, showProducts(data.items))
      })

      postUserData({
        fb_id: message.user,
        first_name: message.userData.first_name,
        last_name: message.userData.last_name,
        image_url: message.userData.profile_pic
      })
      break
    case 'RAISE':
      postBid({
        fb_id: message.user,
        item_id: command[1],
        price: command[2]
      }, (err, res, body) => {
        if (err) console.log(err)

        if (!body.success) {
          bot.reply(message, body.msg)
        } else {
          bot.reply(message, `Thank you. Bid received. We will notify you if you are outbid.`)
        }
      })
      break
    default:
      bot.reply(message, welcomeMessage)
  }
})

// # set webhook routes for botkit
controller.createWebhookEndpoints(app, bot, setCta)

controller.startTicking()

// ~ start listening
const server = app.listen(port, function () {
  console.log(`Express server listening on port ${server.address().port}`)
})
