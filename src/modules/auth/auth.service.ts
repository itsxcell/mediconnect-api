import User from '../user/user.model'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import { UserRole, JwtPayload } from '../../types'

const generateToken = (id: string, role: UserRole): string => {
  return jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  } as jwt.SignOptions)
}

export const registerService = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const existing = await User.findOne({ email })
  if (existing) throw new Error('Email already registered')

  const user = await User.create({ name, email, password, role })
  const token = generateToken(user.id, user.role)

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid credentials')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = generateToken(user.id, user.role)

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}