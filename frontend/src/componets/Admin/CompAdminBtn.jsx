import React from 'react'


export default function CompAdminBtn({children}) {

    //Customized Button

    //children: 물려줄 것!, innerHTML
  return (
    <>
        <button className='comp--admin--btn--container'>{children}</button>
    </>
  )
}
