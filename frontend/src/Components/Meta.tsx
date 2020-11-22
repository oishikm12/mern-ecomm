import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

const Meta: FC<{ title?: string; description?: string; keywords?: string[] }> = ({
  title = 'Welcome to E-Comm',
  description = 'We sell the best products for cheap',
  keywords = ['electronics', 'buy electronics', 'cheap electronics']
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(' ')} />
    </Helmet>
  )
}

export default Meta
