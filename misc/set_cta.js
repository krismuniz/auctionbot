const request = require('request')
const welcomeMessage = require('../messages/welcome_message')

module.exports = () => {
  let options = {
    method: 'POST',
    uri: `https://graph.facebook.com/v2.6/${process.env.PAGE_ID}/thread_settings?access_token=${process.env.PAGE_TOKEN}`,
    body: {
      setting_type: 'call_to_actions',
      thread_state: 'new_thread',
      call_to_actions: [
        {
          message: welcomeMessage
        }
      ]
    },
    json: true
  }

  request(options)
}
