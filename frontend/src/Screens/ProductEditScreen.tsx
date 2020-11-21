import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'

import { listProductDetail, updateProduct } from '../Actions/productActions'

import { PRODUCT_UPDATE_RESET } from '../Constants/productConstants'

import { ReducerState } from '../store'
import { ProdDetailState, ProdModifyState } from '../Types/reducers'

const ProductEditScreen: FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return Current product
   */
  const getProductDetail = (state: ReducerState): ProdDetailState => {
    return state.productDetail
  }

  const productDetail = useSelector(getProductDetail)
  const { loading, error, product } = productDetail

  /**
   * Determines state
   * @param state All global states
   * @return Current product updation
   */
  const getProductUpdate = (state: ReducerState): ProdModifyState => {
    return state.productUpdate
  }

  const productUpdate = useSelector(getProductUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate

  /**
   * Submits form data
   * @param e Event from form
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
        reviews: []
      })
    )
  }

  useEffect(() => {
    if (success) {
      dispatch({
        type: PRODUCT_UPDATE_RESET
      })
      history.push('/admin/productlist')
    } else {
      if (!product?.name || product._id !== productId) {
        dispatch(listProductDetail(productId))
      } else {
        setName(product.name as string)
        setPrice(product.price as number)
        setImage(product.image as string)
        setBrand(product.brand as string)
        setCategory(product.category as string)
        setCountInStock(product.countInStock as number)
        setDescription(product.description as string)
      }
    }
  }, [dispatch, productId, product, history, success])

  /**
   * Uploads a file to server
   * @param e Event from file upload
   */
  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0]
    console.log(file)

    const formData = new FormData()
    formData.append('image', file)
    console.log(JSON.stringify(formData))
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data }: { data: string } = await axios.post('/api/uploads', formData, config)

      console.log(data)

      setImage(data)
      setUploading(false)
    } catch (e) {
      console.error(e)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to="/admin/productlist/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
