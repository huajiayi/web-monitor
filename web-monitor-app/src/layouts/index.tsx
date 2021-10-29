import Header from '@/components/Header'
import React from 'react'

const Layout: React.FC = (props) => {
  return (
    <>
      <Header />
      { props.children }
    </>
  )
}

export default Layout
