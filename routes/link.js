import express from "express"
import {createLink, getLinkDetails, testing} from "../controller/link.js"

const router = express.Router()

router.post('/createLink', createLink)
router.get('/getLinkDetails', getLinkDetails)
router.get('/test', testing)

export default router;