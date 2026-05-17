import mongoose, { Document, Schema } from 'mongoose'

export interface ITherapist extends Document {
  userId: mongoose.Types.ObjectId
  specialization: string[]
  bio: string
  yearsOfExperience: number
  sessionRate: number
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
  isVerified: boolean
  rating: number
  totalSessions: number
}

const therapistSchema = new Schema<ITherapist>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: [{ type: String, required: true }],
    bio: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    sessionRate: { type: Number, required: true },
    availability: [
      {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    isVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model<ITherapist>('Therapist', therapistSchema)