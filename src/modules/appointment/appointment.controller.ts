import { Response } from 'express'
import { AuthRequest } from '../../types'
import {
  bookAppointmentService,
  getMyAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentStatusService,
} from './appointment.service'

export const bookAppointment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { therapistId, scheduledAt, notes } = req.body
    const appointment = await bookAppointmentService(
      req.user!.id,
      therapistId,
      scheduledAt,
      notes
    )
    res.status(201).json({ success: true, data: appointment })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getMyAppointments = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const appointments = await getMyAppointmentsService(
      req.user!.id,
      req.user!.role
    )
    res.status(200).json({ success: true, data: appointments })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getAppointmentById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const appointment = await getAppointmentByIdService(
      req.params['id'] as string,
      req.user!.id
    )
    res.status(200).json({ success: true, data: appointment })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateAppointmentStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const appointment = await updateAppointmentStatusService(
      req.params['id'] as string,
      req.user!.id,
      req.body.status
    )
    res.status(200).json({ success: true, data: appointment })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}