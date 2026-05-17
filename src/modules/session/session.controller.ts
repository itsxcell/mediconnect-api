import { Response } from 'express'
import { AuthRequest } from '../../types'
import {
  generateSessionTokenService,
  endSessionService,
} from './session.service'

export const generateToken = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const result = await generateSessionTokenService(
      req.params['appointmentId'] as string,
      req.user!.id
    )
    res.status(200).json({ success: true, data: result })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const endSession = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const appointment = await endSessionService(
      req.params['appointmentId'] as string,
      req.user!.id
    )
    res.status(200).json({ success: true, data: appointment })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}