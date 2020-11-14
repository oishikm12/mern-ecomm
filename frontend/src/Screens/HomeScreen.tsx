import React, { FC, useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

import Product from '../Components/Product'

import { Prod } from '../Types/common'

const Home: FC = () => {
  const [products, setProducts] = useState<Prod[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
      const data: Prod[] = res.data
      setProducts(data)
    }

    fetchProducts()
  }, [])

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
