import { Router } from 'express'
import { generateToken, endSession } from './session.controller'
import { protect } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/:appointmentId/token', protect, generateToken)
router.patch('/:appointmentId/end', protect, endSession)

export default router