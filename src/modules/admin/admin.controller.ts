import { Response } from 'express'
import { AuthRequest } from '../../types'
import { verifyTherapistService } from './admin.service'

export const verifyTherapist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const therapist = await verifyTherapistService(req.params['id'] as string)
    res.status(200).json({ success: true, data: therapist })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}