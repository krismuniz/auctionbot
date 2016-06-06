'use strict'
const request = require('request')

// Quick wrapper for FB Profile API
module.exports = (bot, message, next) => {
  let url = `https://graph.facebook.com/v2.6/${message.user}` +
    `?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process.env.PAGE_TOKEN}`

  return request({ url: url, json: true }, (err, res, user) => {
    if (err) console.error(err)
    console.log(`Got data from user ${user.first_name}.`)
    message.userData = user
    next()
  })
}
