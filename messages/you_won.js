module.exports = function (data) {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: data.msg,
        buttons: [
          {
            type: 'web_url',
            title: 'Pay Now',
            url: `${process.env.BOT_HOST}/pay?amount=${data.amount}&product_title=${data.title}`
          }
        ]
      }
    }
  }
}
