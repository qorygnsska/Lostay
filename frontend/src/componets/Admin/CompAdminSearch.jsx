import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { CiSearch } from 'react-icons/ci'

export default function CompAdminSearch() {

  const handleSearch = () => {
    
    console.log('click_btn_search');
    
  }


  return (
    <>
        <Form className="comp--admin--search--container">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="input_search"
            />
            <Button id="btn_search" onClick={handleSearch} variant="outline-primary" size="sm"><CiSearch size="24" /></Button>
          </Form>
    </>
  )
}
