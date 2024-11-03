import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import CompAdminSearch from '../../componets/Admin/CompAdminSearch';


export default function PageAdminHome() {






  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <Container id='section_container'>



        </Container>
      </div>
    </>
  )
}