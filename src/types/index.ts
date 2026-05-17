import { Request } from 'express'

export type UserRole = 'patient' | 'therapist' | 'admin'

export interface JwtPayload {
  id: string
  role: UserRole
}

export interface AuthRequest extends Request {
  user?: JwtPayload
}