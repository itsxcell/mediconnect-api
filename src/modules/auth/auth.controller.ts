import { Request, Response } from 'express'
import { registerService, loginService } from './auth.service'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body
    const result = await registerService(name, email, password, role)
    res.status(201).json({ success: true, data: result })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const result = await loginService(email, password)
    res.status(200).json({ success: true, data: result })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}