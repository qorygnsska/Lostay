import React from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container } from 'react-bootstrap'

export default function PageAdminHome() {
  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <Container id='section_container'>
          <h1>PageAdminHome</h1>



        </Container>
      </div>
    </>
  )
}
