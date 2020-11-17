import jwt from 'jsonwebtoken'

/**
 * Generates a token for given id
 * @param id Id to generate token for
 */
const generateToken = (id: string): string => {
  const secret: string = process.env.JWT_SECRET || ''
  return jwt.sign({ id }, secret, {
    expiresIn: '30d'
  })
}

export default generateToken
