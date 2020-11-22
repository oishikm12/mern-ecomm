import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'

import { listProducts, deleteProduct, createProduct } from '../Actions/productActions'

import { PRODUCT_CREATE_RESET } from '../Constants/productConstants'

import { ReducerState } from '../store'
import { ProdListState, ProdModifyState, UniversalState, UserState } from '../Types/reducers'

const ProductListScreen: FC<RouteComponentProps<{ pageNumber?: string }>> = ({ history, match }) => {
  const pageNumber = Number(match.params.pageNumber) || 1

  const dispatch = useDispatch()

  /**
   * Determines state
   * @param state All global states
   * @return Current products
   */
  const getProductList = (state: ReducerState): ProdListState => {
    return state.productList
  }

  const productList = useSelector(getProductList)
  const { loading, error, products, page, pages } = productList

  /**
   * Determines state
   * @param state All global states
   * @return Current product to delete
   */
  const getProductDelete = (state: ReducerState): UniversalState => {
    return state.productDelete
  }

  const productDelete = useSelector(getProductDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  /**
   * Determines state
   * @param state All global states
   * @return Current product to create
   */
  const getProductCreate = (state: ReducerState): ProdModifyState => {
    return state.productCreate
  }

  const productCreate = useSelector(getProductCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  /**
   * Determines state
   * @param state All global states
   * @return Current user data
   */
  const getUserLogin = (state: ReducerState): UserState => {
    return state.userLogin
  }

  const userLogin = useSelector(getUserLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET
    })

    if (!userInfo || !userInfo.isAdmin) history.push('/login')

    if (successCreate) {
      history.push(`/admin/product/${createdProduct?._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  /**
   * Wipes an user from existance
   * @param id Select user ID
   */
  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteProduct(id))
    }
  }

  /**
   * Creates a new Product
   */
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <FontAwesomeIcon icon={faPlus} /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id as string)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages as number} page={page as number} keyword="" isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
