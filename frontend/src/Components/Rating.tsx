import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmp } from '@fortawesome/free-regular-svg-icons'

import { Rates, Star } from '../Types/rating'

const Stars: FC<Star> = ({ index, value, color }) => {
  const icon: IconDefinition = value >= index + 1 ? faStar : value >= index + 0.5 ? faStarHalfAlt : faStarEmp

  return (
    <span key={index}>
      <FontAwesomeIcon icon={icon} color={color} />
    </span>
  )
}

const Rating: FC<Rates> = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i: number) => (
        <Stars index={i} key={i} color={color} value={value} />
      ))}
      <span>{text && text}</span>
    </div>
  )
}

export default Rating
