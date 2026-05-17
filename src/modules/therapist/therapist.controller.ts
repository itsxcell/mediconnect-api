import { Response, NextFunction } from 'express'
import { AuthRequest } from '../../types'
import {
  createProfileService,
  getTherapistsService,
  getTherapistByIdService,
  updateAvailabilityService,
} from './therapist.service'

export const createProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const therapist = await createProfileService(req.user!.id, req.body)
    res.status(201).json({ success: true, data: therapist })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getTherapists = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const therapists = await getTherapistsService()
    res.status(200).json({ success: true, data: therapists })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getTherapistById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const therapist = await getTherapistByIdService(req.params['id'] as string)
    res.status(200).json({ success: true, data: therapist })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateAvailability = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const therapist = await updateAvailabilityService(
      req.user!.id,
      req.body.availability
    )
    res.status(200).json({ success: true, data: therapist })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}