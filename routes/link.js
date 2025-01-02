const {createLink, getLinkDetails, testing} = require('../controller/link')
const router = require('express').Router()

router.post('/createLink', createLink)
router.get('/getLinkDetails', getLinkDetails)
router.get('/test', testing)

module.exports = router