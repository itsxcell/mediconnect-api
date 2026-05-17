import { Router } from 'express'
import {
  bookAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} from './appointment.controller'
import { protect, restrictTo } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/', protect, restrictTo('patient'), bookAppointment)
router.get('/my', protect, getMyAppointments)
router.get('/:id', protect, getAppointmentById)
router.patch('/:id/status', protect, updateAppointmentStatus)

export default router