import React, { FC, useState, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'

import { savePaymentMethod } from '../Actions/cartActions'

import { ReducerState } from '../store'
import { CartState } from '../Types/reducers'

const PaymentScreen: FC<RouteComponentProps> = ({ history }) => {
  /**
   * Determines state
   * @param state All global states
   * @return List of cart items
   */
  const getCartItems = (state: ReducerState): CartState => {
    return state.cart
  }

  const cart = useSelector(getCartItems)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  /**
   * Moves on to checkout
   * @param e Form submit
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e: FormEvent) => setPaymentMethod((e.target as HTMLInputElement).value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
