import Therapist from './therapist.model'
import User from '../user/user.model'

export const createProfileService = async (
  userId: string,
  data: {
    specialization: string[]
    bio: string
    yearsOfExperience: number
    sessionRate: number
    availability: { day: string; startTime: string; endTime: string }[]
  }
) => {
  const existing = await Therapist.findOne({ userId })
  if (existing) throw new Error('Therapist profile already exists')

  const therapist = await Therapist.create({ userId, ...data })
  return therapist
}

export const getTherapistsService = async () => {
  return Therapist.find({ isVerified: true }).populate('userId', 'name email')
}

export const getTherapistByIdService = async (id: string) => {
  const therapist = await Therapist.findById(id).populate('userId', 'name email')
  if (!therapist) throw new Error('Therapist not found')
  return therapist
}

export const updateAvailabilityService = async (
  userId: string,
  availability: { day: string; startTime: string; endTime: string }[]
) => {
  const therapist = await Therapist.findOneAndUpdate(
    { userId },
    { availability },
    { new: true }
  )
  if (!therapist) throw new Error('Therapist profile not found')
  return therapist
}