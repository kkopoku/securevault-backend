const {createLink, getLinkDetails} = require('../controller/link')
const router = require('express').Router()

router.post('/createLink', createLink)
router.get('/getLinkDetails', getLinkDetails)

module.exports = router