import React, { FC, useState, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox: FC<RouteComponentProps> = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  /**
   * Handles search
   * @param e Form Submit
   */
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products ..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
