const router = require('express').Router()
const request = require('request')

const showProducts = require('../messages/show_products')
const youWonMessage = require('../messages/you_won')

// an endpoint to send push notifications
router.post('/', (req, res) => {
  req.body.users.forEach((v, i) => {
    let notification = {}

    if (req.body.code !== 340) {
      notification = {
        method: 'POST',
        body: {
          recipient: {
            id: v.fb_id
          },
          message: {
            text: req.body.msg
          }
        },
        uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_TOKEN}`,
        json: true
      }
    } else {
      notification = {
        method: 'POST',
        body: {
          recipient: {
            id: v.fb_id
          },
          message: youWonMessage({
            msg: req.body.msg,
            title: encodeURIComponent(req.body.items[0].title),
            amount: encodeURIComponent(req.body.items[0].current_bid.price)
          })
        },
        uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_TOKEN}`,
        json: true
      }
    }

    let products = {
      method: 'POST',
      body: {
        recipient: {
          id: v.fb_id
        },
        message: showProducts(req.body.items)
      },
      uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_TOKEN}`,
      json: true
    }

    request(notification)

    if (req.body.items.length > 0 && req.body.code !== 340) {
      request(products)
    }
  })
  res.send({ success: true })
})

module.exports = router
