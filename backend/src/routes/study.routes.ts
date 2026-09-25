import express  from "express"
import {postGenerate} from '../controllers/study.controller'
const router = express.Router()
router.post('/generate',postGenerate)
export default router