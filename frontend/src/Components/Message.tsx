import React, { FC } from 'react'
import { Alert } from 'react-bootstrap'

const Message: FC<{ variant?: string }> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message
