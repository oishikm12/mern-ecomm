import React, { FC } from 'react'
import { Container } from 'react-bootstrap'

import Header from './Components/Header'
import Footer from './Components/Footer'

const App: FC = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>This is the way</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
