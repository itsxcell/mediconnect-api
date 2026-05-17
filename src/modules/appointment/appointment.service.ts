import Appointment from './appointment.model'
import Therapist from '../therapist/therapist.model'

export const bookAppointmentService = async (
  patientId: string,
  therapistId: string,
  scheduledAt: string,
  notes: string
) => {
  const therapist = await Therapist.findById(therapistId)
  if (!therapist) throw new Error('Therapist not found')
  if (!therapist.isVerified) throw new Error('Therapist is not verified yet')

  const conflict = await Appointment.findOne({
    therapistId,
    scheduledAt: new Date(scheduledAt),
    status: { $in: ['pending', 'confirmed'] },
  })
  if (conflict) throw new Error('Therapist is not available at this time')

  const appointment = await Appointment.create({
    patientId,
    therapistId,
    scheduledAt: new Date(scheduledAt),
    sessionRate: therapist.sessionRate,
    notes,
  })

  return appointment
}

export const getMyAppointmentsService = async (
  userId: string,
  role: string
) => {
  const filter =
    role === 'patient' ? { patientId: userId } : { therapistId: userId }

  return Appointment.find(filter)
    .populate('patientId', 'name email')
    .populate('therapistId', 'specialization sessionRate')
    .sort({ scheduledAt: -1 })
}

export const getAppointmentByIdService = async (
  appointmentId: string,
  userId: string
) => {
  const appointment = await Appointment.findById(appointmentId)
    .populate('patientId', 'name email')
    .populate('therapistId', 'specialization sessionRate')

  if (!appointment) throw new Error('Appointment not found')

  const isOwner =
    appointment.patientId.toString() === userId ||
    appointment.therapistId.toString() === userId

  if (!isOwner) throw new Error('Access denied')

  return appointment
}

export const updateAppointmentStatusService = async (
  appointmentId: string,
  userId: string,
  status: string
) => {
  const appointment = await Appointment.findById(appointmentId)
  if (!appointment) throw new Error('Appointment not found')

  const isOwner =
    appointment.patientId.toString() === userId ||
    appointment.therapistId.toString() === userId

  if (!isOwner) throw new Error('Access denied')

  appointment.status = status as any
  await appointment.save()

  return appointment
}