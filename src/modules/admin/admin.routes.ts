import { Router } from 'express'
import { verifyTherapist } from './admin.controller'
import { protect, restrictTo } from '../../middlewares/auth.middleware'

const router = Router()

router.patch(
  '/therapists/:id/verify',
  protect,
  restrictTo('admin'),
  verifyTherapist
)

export default router