const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.end('register api worked')
})

module.exports = router
