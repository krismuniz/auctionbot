const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

router.get('/', (req, res) => {
  res.render('pay', {
    title: `${req.query.product_title} Payment - AuctionBot`,
    amount: req.query.amount,
    product_title: req.query.product_title,
    stripe_api_key: process.env.STRIPE_DATA_KEY,
    org_name: process.env.ORGANIZATION_NAME
  })
})

router.post('/', (req, res) => {
  let stripeToken = req.body.stripeToken

  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    source: stripeToken,
    description: req.body.product_title
  }, function (err, charge) {
    if (err) console.log(err)
    res.render('payment_success', {
      title: `Payment Completed! - AuctionBot`,
      org_name: process.env.ORGANIZATION_NAME
    })
  })
})

module.exports = router
