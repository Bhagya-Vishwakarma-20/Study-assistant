import express  from "express"
import {getGenerate} from '../controllers/study.controller'
const router = express.Router()
router.post('/generate',getGenerate)
export default router