import mongoose, { Document, Schema } from 'mongoose'

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId
  therapistId: mongoose.Types.ObjectId
  scheduledAt: Date
  duration: number
  status: AppointmentStatus
  notes: string
  sessionRate: number
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Therapist',
      required: true,
    },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 60 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
    sessionRate: { type: Number, required: true },
  },
  { timestamps: true }
)

export default mongoose.model<IAppointment>('Appointment', appointmentSchema)