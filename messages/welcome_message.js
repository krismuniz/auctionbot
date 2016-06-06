module.exports = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: `Click "Start Bidding" to see our auction items. Swipe right to see the next item.`,
      buttons: [
        {
          type: 'postback',
          title: 'Start Bidding',
          payload: 'SHOW-PRODUCTS'
        }
      ]
    }
  }
}
