import Therapist from '../therapist/therapist.model'

export const verifyTherapistService = async (therapistId: string) => {
  const therapist = await Therapist.findByIdAndUpdate(
    therapistId,
    { isVerified: true },
    { new: true }
  )
  if (!therapist) throw new Error('Therapist not found')
  return therapist
}