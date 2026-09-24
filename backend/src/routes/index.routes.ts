import studyRoutes from './study.routes';
import express from 'express'
const router = express.Router()
router.use('/api/study',studyRoutes)
export default router