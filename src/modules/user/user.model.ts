import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserRole } from '../../types'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  isVerified: boolean
  createdAt: Date
  comparePassword(candidate: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['patient', 'therapist', 'admin'],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password as string, 12)
})

userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password as string)
}

export default mongoose.model<IUser>('User', userSchema)