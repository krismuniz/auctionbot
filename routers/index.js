const router = require('express').Router()

router.get('/', (req, res) => {
  res.send(`The Bot is up.`)
})

module.exports = router
