import { RtcTokenBuilder, RtcRole } from 'agora-token'
import { env } from '../../config/env'
import Appointment from '../appointment/appointment.model'

export const generateSessionTokenService = async (
  appointmentId: string,
  userId: string
) => {
  const appointment = await Appointment.findById(appointmentId)
  if (!appointment) throw new Error('Appointment not found')

  const isOwner =
    appointment.patientId.toString() === userId ||
    appointment.therapistId.toString() === userId

  if (!isOwner) throw new Error('Access denied')

  if (appointment.status !== 'confirmed')
    throw new Error('Appointment is not confirmed yet')

  const channelName = `mediconnect_${appointmentId}`
  const expirationInSeconds = 3600
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const expirationTimestamp = currentTimestamp + expirationInSeconds

  const token = RtcTokenBuilder.buildTokenWithUid(
    env.agora.appId,
    env.agora.appCertificate,
    channelName,
    0,
    RtcRole.PUBLISHER,
    expirationTimestamp,
    expirationTimestamp
  )

  return { token, channelName, appId: env.agora.appId }
}

export const endSessionService = async (
  appointmentId: string,
  userId: string
) => {
  const appointment = await Appointment.findById(appointmentId)
  if (!appointment) throw new Error('Appointment not found')

  const isOwner =
    appointment.patientId.toString() === userId ||
    appointment.therapistId.toString() === userId

  if (!isOwner) throw new Error('Access denied')

  appointment.status = 'completed'
  await appointment.save()

  return appointment
}