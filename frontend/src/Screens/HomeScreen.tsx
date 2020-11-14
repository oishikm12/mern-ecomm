import React, { FC } from 'react'
import { Col, Row } from 'react-bootstrap'

import Product from '../Components/Product'

import { Prod } from '../Types/common'

import products from '../products'

const Home: FC = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product: Prod, index: number) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
