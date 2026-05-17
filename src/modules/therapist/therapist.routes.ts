import { Router } from 'express'
import {
  createProfile,
  getTherapists,
  getTherapistById,
  updateAvailability,
} from './therapist.controller'
import { protect, restrictTo } from '../../middlewares/auth.middleware'

const router = Router()

router.get('/', getTherapists)
router.get('/:id', getTherapistById)
router.post('/profile', protect, restrictTo('therapist'), createProfile)
router.patch('/availability', protect, restrictTo('therapist'), updateAvailability)

export default router